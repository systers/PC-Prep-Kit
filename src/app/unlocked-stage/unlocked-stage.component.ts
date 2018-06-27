import { Component, OnInit, AfterViewChecked, Renderer2 } from '@angular/core';
import * as $ from 'jquery';
import { DashboardService } from '../services/dashboard.service';
import { SharedDataService } from '../services/shared.data.service';
import { LanguageService } from '../services/language.service';

@Component({
    selector: 'app-unlocked-stage',
    templateUrl: './unlocked-stage.component.html',
    styleUrls: ['./unlocked-stage.component.scss']
})
export class UnlockedStageComponent implements OnInit {

    private _canvas;
    private _sprayItem;
    private _netItem;
    private _spray;
    private _net;
    private $human;
    private _humanProgBar;
    private _mosquitoProgBar;
    private _netHealthBar;
    private _collisionWithManStatus = false;
    private _collisionWithNetStatus = false;
    private _collisionWithSprayStatus = false;
    private _humanBarWidth = 100;
    private _mosquitoBarWidth = 100;
    private _netHealthBarWidth = 100;
    private _mousemoveListener;
    private _mouseleaveListener;
    private _mouseEnterListener;
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

  public mosquito1;
    public mosquito2;
    public gameOver = false;
    public success = false;
    public language: any;
    public score = 0;
    public spray: boolean;
    public net: boolean;
    public sprayValue = 100;

    constructor(private _langService: LanguageService, private _renderer: Renderer2, private _dashboardService: DashboardService, private _sharedData: SharedDataService) { }

    ngOnInit() {
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.stages.lockedStage.game;
        });
        this.$mosquito = $('<div><img src="../assets/img/unlocked-stage/mosquito.gif" class="moz"></div>');
        const progress = $('<div class="text">' + 100 + '</div>');
        this.$mosquito.attr({'class': 'moz'});
        this.$mosquito.append(progress);
        const copy0 = this.$mosquito.clone();
        const copy1 = this.$mosquito.clone();
      // progress.addClass('moz');
        $('#scene').append(copy0);
        // this.mosquitoesStrength.push(100);
        const copy = this.$mosquito.clone();
        $('#scene').append(copy1);
        this.mosquitoes.push(copy0);
        this.mosquitoes.push(copy1);
      // this.mosquitoesStrength.push(100);
        this.$spray = $('<img src="../assets/img/unlocked-stage/spray-cursor.gif">');
        this.$spray.attr({'id': 'spray'});
        $('#scene').append(this.$spray);

        this.$net = $('<img src="../assets/img/unlocked-stage/net.png">');
        this.$net.attr({'id': 'net'});
        $('#scene').append(this.$net);
        // $('#scene').append('<img class="moz" src="../assets/img/unlocked-stage/mosquito.gif" id="moz1" name="animate">');
        this._humanProgBar = document.getElementById('human-health-bar');
        this._mosquitoProgBar = document.getElementById('mosquito-health-bar');
        this._netHealthBar = document.getElementById('net-health-bar');
        this.$human = $('<img src="../assets/img/unlocked-stage/human.png">').attr({'id': 'human'});
        $('#scene').append(this.$human);


      this._sprayItem = document.getElementById('spray-item');
        this._netItem = document.getElementById('net-item');
        this._mousedownListener = this._renderer.listen(this._sprayItem, 'click', (event) => this.changeCursorSpray(event));
        this._renderer.listen(this._netItem, 'click', (event) => this.changeCursorNet(event));
        // this.mosquitoes.forEach((mosquito, id) => {
        //   console.log(id);
        //   this.animateDiv(mosquito, [100, 100]);
        // });
      // this.animateDiv(this.mosquitoes[0], [100, 100]);
        this.incrementScore();

    }

    changeCursorSpray(e) {
        this._spray = this.$spray;
        this._canvas =  document.getElementById('scene');
        this._mousemoveListener = this._renderer.listen(this._canvas, 'mousemove', (event) => this.moveOverCanvasSpray(event));
        this._mouseleaveListener = this._renderer.listen(this._canvas, 'mouseleave', (event) => this.leaveCanvas());
        this._mousedownListener = this._renderer.listen(this._canvas, 'mousedown', (event) => this.attack());
        this._mouseupListener = this._renderer.listen(this._canvas, 'mouseup', (event) => this.stopAttack());
        this._mouseEnterListener = this._renderer.listen(this._canvas, 'mouseenter', event1 => this.enterCanvas());
        // this._spray.style.display = 'block';
        this.$spray.css({display: 'block'});
        this.net = false;
        this.spray = true;
        // this.net = false;

      if (this._net) {
          // $('#net').hide();
          this._net.css({display: 'none'});
        }
    }

    changeCursorNet(e) {
    this._net = this.$net;
    this._canvas =  document.getElementById('scene');
    this._mousemoveListener = this._renderer.listen(this._canvas, 'mousemove', (event) => this.moveOverCanvasNet(event));
    this._mouseleaveListener = this._renderer.listen(this._canvas, 'mouseleave', (event) => this.leaveCanvas());
    this._mousedownListener = this._renderer.listen(this._canvas, 'mousedown', (event) => this.attack());
    this._mouseupListener = this._renderer.listen(this._canvas, 'mouseup', (event) => this.stopAttack());
    this._net.css({display: 'block'});
    this.spray = false;
    this.net = true;
      $('#spray').css({display: 'none'});
    // this.spray = false;
      if (this.spray) {
        this._spray.css({display: 'none'});
        $('#spray').css({display: 'none'});
      }
  }
    measureSpray() {
      const that = this;
        setTimeout(function () {
          if (that._mousedown) {
          that.sprayValue -= 1;
          that.measureSpray();
          }
        }, 10)
    }
    attack() {
        // this._spray.src = '../assets/img/unlocked-stage/spray.gif';
        this.$spray.attr('src', '../assets/img/unlocked-stage/spray.gif');
        this._mousedown = true;
        this.measureSpray();
    }

    stopAttack() {
      this.$spray.attr('src', '../assets/img/unlocked-stage/spray-cursor.gif');
      // this._spray.src = '../assets/img/unlocked-stage/spray-cursor.gif';
        this._mousedown = false;
    }

    moveOverCanvasSpray(e) {
        this._canvas.style.cursor = 'none';
        this._spray.css({display: 'block'});
        // this._spray.style.left = e.pageX - 425 + 'px';
        this._spray.css({left: e.pageX - 425 + 'px'});
        this._spray.css({top: e.pageY - 150 + 'px'});

      // this._spray.style.top = e.pageY - 150 + 'px';
      // if (this._net) {
      //   // this._net.style.display = 'none';
      //   // $('#net').hide();
      //   $('#net').css({display: 'none'});
      //   console.log('I am here');
      // }
    }

    moveOverCanvasNet(e) {
        this._canvas.style.cursor = 'none';
        this._net.css({display: 'block'});
        // this._net.style.left = e.pageX - 425 + 'px';
        // this._net.style.top = e.pageY - 150 + 'px';
        // this.detectChanges();
        this._net.css({left: '840px'});
        this._net.css({top: (e.pageY - 550 < 0) ? '400px' :  e.pageY - 150 + 'px'});
    }

    leaveCanvas() {
      if (this._spray) {
        this._spray.css({display: 'none'})
      } else if (this._net) {
        this._net.css({display: 'none'});
      }
    }
    enterCanvas() {
      console.log('entered');
      if (this._spray) {
        this._spray.css({display: 'none'});
      } else if (this._net) {
        this._net.css({display: 'block'});
      }
    }

    animateDiv(mosquito, newMosquitoPosition, id) {
        // this.mosquitoes.forEach((mosquito, id) => {
          let collision: boolean;
          console.log('Element:' + id );
          const newMosquitoPos = newMosquitoPosition;
          const oldMosquitoTop = mosquito.offset().top;
          const oldMosquitoLeft = mosquito.offset().left;
          const currObj = this;
          console.log('Old positions:' + [oldMosquitoTop, oldMosquitoLeft]);
          console.log('new positions:'  + newMosquitoPos);
          const speed = this.calcSpeed([oldMosquitoTop, oldMosquitoLeft], newMosquitoPos);
          mosquito.animate({ top: newMosquitoPos[1], left: newMosquitoPos[0] }, {
            duration: speed,
            start: function() {
              collision = false;
            },
            step: function() {
              if (currObj._net && currObj._net.css('display') === 'block' && currObj.checkNewCollison(mosquito, currObj._net)) {
                if (!currObj._collisionWithNetStatus) {
                const x = mosquito.offset().left;
                const y = mosquito.offset().top;
                mosquito.stop();
                currObj._netHealthBarWidth -= 10;
                currObj._netHealthBar.style.width = currObj._netHealthBarWidth + '%';
                setTimeout(function () {
                  const newNextMosquitoPosition = [ x - 1000, y];
                  currObj.animateDiv(mosquito, newNextMosquitoPosition, id);
                }, 1000);
                  currObj._collisionWithNetStatus = true;
                  console.log('collision');
                }
              }
               if ( (currObj.checkNewCollison(mosquito, currObj.$human))) {
                if (!currObj._collisionWithManStatus) {
                  currObj._humanBarWidth -= 10;
                  currObj._humanProgBar.style.width = currObj._humanBarWidth + '%';
                  currObj._collisionWithManStatus = true;
                }
              }
              if (!collision) {
                if (currObj._spray && currObj._mousedown && currObj._spray.css('display') === 'block' && currObj.checkNewCollison(mosquito, currObj._spray)) {
                  collision = true;
                  currObj.mosquitoesStrength[id] -= 20;
                  if (currObj.mosquitoesStrength[id] === 0) {mosquito.remove(); }
                  mosquito.children('.text').text(currObj.mosquitoesStrength[id]);
                  currObj._mosquitoBarWidth -= 10;
                  currObj._mosquitoProgBar.style.width = currObj._mosquitoBarWidth + '%';
                }
              }
            },
            done: function () {
              const newNextMosquitoPosition = currObj.makeNewPosition();
              currObj.animateDiv(mosquito, newNextMosquitoPosition, id);
              console.log('RANDOM POSITION:' +  newNextMosquitoPosition);
              currObj._collisionWithManStatus = false;
              currObj._collisionWithNetStatus = false;
              // currObj._collisionWithSprayStatus = false;
            }});
        // console.log('in top');
        // const newMosquitoPos = newMosquitoPosition;
        // const oldMosquitoTop = this.$mosquito.offset().top;
        // const oldMosquitoLeft = this.$mosquito.offset().left;
        // const currObj = this;
        // const speed = this.calcSpeed([oldMosquitoTop, oldMosquitoLeft], newMosquitoPos);
        // this.$mosquito.animate({ top: newMosquitoPos[1], left: newMosquitoPos[0] }, {
        //   duration: speed,
        //    step: function() {
        //      // if (currObj._net && currObj._net.style.display === 'block' && currObj.checkNewCollison(currObj.mosquito1, currObj._net)) {
        //      //   if (!currObj._collisionWithNetStatus) {
        //      //   const x = currObj.mosquito1.offset().left;
        //      //   const y = currObj.mosquito1.offset().top;
        //      //   currObj.$mosquito.stop();
        //      //   currObj._netHealthBarWidth -= 10;
        //      //   currObj._netHealthBar.style.width = currObj._netHealthBarWidth + '%';
        //      //   setTimeout(function () {
        //      //     const nextMosquitoPosition = [ x - 100, y];
        //      //     currObj.animateDiv(nextMosquitoPosition);
        //      //   }, 1000);
        //      //     currObj._collisionWithNetStatus = true;
        //      //     console.log('collision');
        //      //   }
        //      // }
        //
        //
        //      //  if ( (currObj.checkNewCollison(currObj.mosquito1, currObj._human))) {
        //      //   if (!currObj._collisionWithManStatus) {
        //      //     currObj._humanBarWidth -= 10;
        //      //     currObj._humanProgBar.style.width = currObj._humanBarWidth + '%';
        //      //     currObj._collisionWithManStatus = true;
        //      //   }
        //      // }
        //       if (!currObj._collisionWithSprayStatus) {
        //        if (currObj._spray && currObj._mousedown && currObj._spray.css('display') === 'block' && currObj.checkNewCollison(currObj.mosquito1, currObj._spray)) {
        //          currObj._collisionWithSprayStatus = true;
        //          currObj._mosquitoBarWidth -= 10;
        //          currObj._mosquitoProgBar.style.width = currObj._mosquitoBarWidth + '%';
        //        }
        //      }
        //   },
        //   done: function () {
        //     const nextMosquitoPosition = currObj.makeNewPosition();
        //     currObj.animateDiv(nextMosquitoPosition);
        //     // console.log(nextMosquitoPosition);
        //     console.log('in complete function');
        //     currObj._collisionWithManStatus = false;
        //     currObj._collisionWithNetStatus = false;
        //     currObj._collisionWithSprayStatus = false;
        // }});

    }


    checkNewCollison(a, b) {
      if (a.offset().left < b.offset().left + b.width() && a.offset().left + a.width() > b.offset().left && a.offset().top < b.offset().top + b.height() && a.height() + a.offset().top > b.offset().top ) {
        return true;
      }
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
        console.log('Positions' +  xPos + ',' + yPos);

        const speedModifier = 0.25;

        const speed = Math.ceil(greatest / speedModifier);
        console.log('speed is ' + speed);

        return speed;
    }

    reload() {
        this._mosquitoBarWidth = 100;
        this._humanBarWidth = 100;
        this._mosquitoProgBar.style.width = this._mosquitoBarWidth + '%';
        this._humanProgBar.style.width = this._humanBarWidth + '%';
        this.gameOver = false;
        this.success = false;
        this.ngOnInit();
    }

    incrementScore() {
      const that = this;
      if (that.score === 0) {
        this.setMosquitoes();
      }
      this._timeout = setTimeout(function () {
        if (that.score === 10) {
          const copy = that.$mosquito.clone();
          $('#scene').append(copy);
          // that.mosquitoesStrength.push(100);
          that.animateDiv(copy, [100, 100], 2);
        }
        that.score++;
        that.incrementScore();
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

}
