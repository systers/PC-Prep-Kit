import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import * as $ from 'jquery';
import { DashboardService } from '../services/dashboard.service';
import { SharedDataService } from '../services/shared.data.service';
import { LanguageService } from '../services/language.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-unlocked-stage',
  templateUrl: './unlocked-stage.component.html',
  styleUrls: ['./unlocked-stage.component.scss']
})
export class UnlockedStageComponent implements OnInit {

  public gameOver = false;
  public success = false;
  public language: any;
  public time = 0;
  public spray: boolean;
  public net: boolean;
  public sprayValue = 100;
  public starCount = 0;

  private _canvas;
  private _spray;
  private $human;
  private _humanProgBar;
  private _collisionWithManStatus = false;
  private _collisionWithNetStatus = false;
  private _humanBarWidth = 100;
  private _mousemoveListener;
  private _mouseleaveListener;
  private _mousedownListener;
  private _mouseupListener;
  private _mousedown = false;
  private _status: object = {stage: 5, activity: 3};
  private _timeout;
  private $mosquito;
  private $spray;
  private $net;
  private mosquitoes = [];
  private maxMosquitoes = 10;
  private mosquitoesStrength = Array(this.maxMosquitoes).fill(100);
  private mosCountInitial = 2;
  private mosCountCurrent = this.mosCountInitial;
  private keydown = false;
  private levelCounter = 1;
  private maxLevel = 4;

  constructor(private _langService: LanguageService, private _renderer: Renderer2, private _dashboardService: DashboardService, private _sharedData: SharedDataService,
              public snackBar: MatSnackBar) {
  }

  // If we need keyboard movement for the net
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.keyCode === 38) {
      this.keydown = true;
      const that = this;
      setInterval(function () {
        if (that.keydown) {
          that.$net.css({top: '-=2px'});
        }
      }, 10);
    }
    if (event.keyCode === 40) {
      this.keydown = false;
      this.$net.css({top: '+=20px'});
    }
  }


  ngOnInit() {
    this._langService.loadLanguage().subscribe(response => {
      this.language = response.pcprepkit.stages.lockedStage.game;
    });
    this._canvas = document.getElementById('scene');

    // Initialising single mosquito
    this.$mosquito = $('<div><img src="../assets/img/unlocked-stage/mosquito.gif" class="moz"></div>');
    const progress = $('<div class="mosquitoHealth">' + 100 + '</div>');
    this.$mosquito.attr({'class': 'moz'});
    this.$mosquito.append(progress);

    // Adding n = mosCountInitial initially in the game
    for (let i = 1; i <= this.mosCountInitial; i++) {
      const mosquitoClone = this.$mosquito.clone();
      $('#scene').append(mosquitoClone);
      this.mosquitoes.push(mosquitoClone);
    }

    // Spray element
    this.$spray = $('<img src="../assets/img/unlocked-stage/spray-cursor.gif">');
    this.$spray.attr({'id': 'spray'});
    $('#scene').append(this.$spray);

    // Net element
    this.$net = $('<img src="../assets/img/unlocked-stage/net.png">');
    this.$net.attr({'id': 'net'});
    $('#scene').append(this.$net);
    this.$net.css({display: 'block'});
    this.$net.css({left: '840px'});

    // Progress and HealthBars
    this._humanProgBar = document.getElementById('human-health-bar');

    // Human
    this.$human = $('<img src="../assets/img/unlocked-stage/human.png">').attr({'id': 'human'});
    $('#scene').append(this.$human);

    // Time increment begins as the game starts
    this.incrementTime();
    this._spray = this.$spray;
    this._mousemoveListener = this._renderer.listen(this._canvas, 'mousemove', (event) => this.moveOverCanvasSpray(event));
    this._mouseleaveListener = this._renderer.listen(this._canvas, 'mouseleave', (event) => this.leaveCanvas());
    this._mousedownListener = this._renderer.listen(this._canvas, 'mousedown', (event) => this.attack());
    this._mouseupListener = this._renderer.listen(this._canvas, 'mouseup', (event) => this.stopAttack());
    const that = this;
    this.$net.mouseenter(function () {
      that._renderer.listen(that._canvas, 'mousemove', (event) => that.moveOverCanvasNet(event))
    });
  }

  measureSpray() {
    const that = this;
    setTimeout(function () {
      if (that._mousedown) {
        that.stopAttack();
        that.sprayValue -= 4;
        that.measureSpray();
      }
    }, 500)
  }

  attack() {
    this.$spray.attr('src', '../assets/img/unlocked-stage/spray.gif');
    this._mousedown = true;
    this.measureSpray();
  }

  stopAttack() {
    this.$spray.attr('src', '../assets/img/unlocked-stage/spray-cursor.gif');
    this._mousedown = false;
  }

  moveOverCanvasSpray(e) {
    this._canvas.style.cursor = 'none';
    this._spray.css({display: 'block'});
    this._spray.css({left: e.pageX - 510 + 'px'});
    this._spray.css({top: e.pageY - 150 + 'px'});
  }

  moveOverCanvasNet(e) {
    if (!(e.pageX > 1270 || e.pageX < 1200 || e.pageY < 517)) {
      this.$net.css({top: e.pageY - 150 + 'px'});
    }
  }

  leaveCanvas() {
    if (this._spray) {
      this._spray.css({display: 'none'})
    }
  }

  animateDiv(mosquito, newMosquitoPosition, id) {
    let collisionWithSpray: boolean;
    const newMosquitoPos = newMosquitoPosition;
    const oldMosquitoTop = mosquito.offset().top;
    const oldMosquitoLeft = mosquito.offset().left;
    const currObj = this;
    const speed = this.calcSpeed([oldMosquitoTop, oldMosquitoLeft], newMosquitoPos);
    mosquito.animate({top: newMosquitoPos[1], left: newMosquitoPos[0]}, {
      duration: speed,
      start: function () {
        collisionWithSpray = false;
      },
      step: function () {
        if (currObj.$net && currObj.$net.css('display') === 'block' && currObj.checkCollison(mosquito, currObj.$net)) {
          if (!currObj._collisionWithNetStatus) {
            const x = mosquito.offset().left;
            const y = mosquito.offset().top;
            mosquito.stop();
            setTimeout(function () {
              const newNextMosquitoPosition = [x - 1000, y];
              currObj.animateDiv(mosquito, newNextMosquitoPosition, id);
            }, 1000);
            currObj._collisionWithNetStatus = true;
          }
        }
        if ((currObj.checkCollison(mosquito, currObj.$human))) {
          if (!currObj._collisionWithManStatus) {
            currObj._humanBarWidth -= 10;
            currObj._humanProgBar.style.width = currObj._humanBarWidth + '%';
            currObj._collisionWithManStatus = true;
            if (currObj._humanBarWidth === 0) {currObj.gameOver = true}
          }
        }
        if (!collisionWithSpray) {
          if (currObj._spray && currObj._mousedown && currObj._spray.css('display') === 'block' && currObj.checkCollison(mosquito, currObj._spray)) {
            collisionWithSpray = true;
            currObj.mosquitoesStrength[id] -= 20;
            if (currObj.mosquitoesStrength[id] === 0) {
              mosquito.remove();
              currObj.mosCountCurrent--;
              currObj.starCount++;
              if (currObj.mosCountCurrent === 0) {
                currObj.success = true;
              }
            }
            mosquito.children('.mosquitoHealth').text(currObj.mosquitoesStrength[id]);
          }
        }
      },
      done: function () {
        const newNextMosquitoPosition = currObj.makeNewPosition();
        currObj.animateDiv(mosquito, newNextMosquitoPosition, id);
        currObj._collisionWithManStatus = false;
        currObj._collisionWithNetStatus = false;
      }
    });
  }

  openDialog(message: string) {
    this.snackBar.open(message, '', {
      verticalPosition: 'top',
      panelClass: 'gameSnackBar'
    })
  }

  healthBoost() {
    if (this.starCount < 2) {
      this.openDialog(this.language.alerts.buy.fail.health);
    } else {
      this.openDialog(this.language.alerts.buy.success.health);
      this._humanBarWidth = (this._humanBarWidth + 30) >= 100 ? 100 : this._humanBarWidth + 30;
      this._humanProgBar.style.width = this._humanBarWidth + '%';
      this.starCount -= 2;
    }
  }

  sprayRefill() {
    if (this.starCount < 1) {
      this.openDialog(this.language.alerts.buy.fail.spray);
    } else {
      this.openDialog(this.language.alerts.buy.success.spray);
      this.sprayValue += 20;
      this.starCount -= 1;
    }
  }

  checkCollison(a, b) {
    return (a.offset().left < b.offset().left + b.width() &&
      a.offset().left + a.width() > b.offset().left &&
      a.offset().top < b.offset().top + b.height() &&
      a.height() + a.offset().top > b.offset().top);
  }

  makeNewPosition() {
    // Get viewport dimensions (remove the dimension of the div)
    const height = document.getElementById('scene').offsetWidth - 25;
    const width = document.getElementById('scene').offsetHeight - 25;

    const newHeight = Math.floor(Math.random() * height);
    const newWidth = Math.floor(Math.random() * width);

    return [newHeight, newWidth];
  }

  calcSpeed(prev, next) {
    const xPos = Math.abs(prev[1] - next[1]);
    const yPos = Math.abs(prev[0] - next[0]);

    const greatest = xPos > yPos ? xPos : yPos;

    const speedModifier = 0.25;

    const speed = Math.ceil(greatest / speedModifier);

    return speed;
  }

  reload() {
    this._humanBarWidth = 100;
    this._humanProgBar.style.width = this._humanBarWidth + '%';
    this.gameOver = false;
    this.success = false;
    location.reload();
  }

  incrementTime() {
    const that = this;
    if (that.time === 0) {
      this.setMosquitoes();
    }
    this._timeout = setTimeout(function () {
      if (that.time === 10) {
        that.addMosquito();
      }
      if (that.time === 20) {
        that.addMosquito();
      }
      if (that.time === 35) {
        that.addMosquito();
      }
      that.time++;
      that.incrementTime();
    }, 1000)
  }

  setMosquitoes() {
    for (let i = 0; i < this.mosquitoes.length; i++) {
      this.animateDiv(this.mosquitoes[i], [100, 100], i);
    }
  }

  pauseIncrementScore() {
    clearTimeout(this._timeout);
  }

  addMosquito() {
    const copy = this.$mosquito.clone();
    $('#scene').append(copy);
    this.animateDiv(copy, [100, 100], this.mosCountInitial++);
    this.mosCountCurrent++;
    this.levelCounter++;
    const levelMessage = (this.levelCounter === this.maxLevel) ? this.language.alerts.level.finalLevel : this.language.alerts.level.nextLevel + ' ' + this.levelCounter;
    this.openDialog(levelMessage);
  }

}
