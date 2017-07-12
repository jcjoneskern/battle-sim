(function() {
  angular.module('pkmn', [])
  .controller('battleCtrl', function($scope) {

    class Move {
      constructor(name, mult) {
        this.name = name;
        this.mult = mult;
      }
    }

    class Pkmn {
      constructor(name, hp, maxhp, moves, active) {
        this.name = name;
        this.hp = hp;
        this.maxhp = maxhp;
        this.moves = moves;
        this.active = active;
      }
    }

    const tackle = new Move('Tackle', 1);
    const thunderShock = new Move('Thunder Shock', 1.2);
    const vineWhip = new Move('Vine Whip', 1.2);
    const bubble = new Move('Bubble', 1.2);
    const ember = new Move('Ember', 1.2);
    const peck = new Move('Peck', 1.1);
    const quickAttack = new Move('Quick Attack', 1.1);

    const pikachu = new Pkmn('Pikachu', 20, 20, [tackle, thunderShock], true);
    const bulbasaur = new Pkmn('Bulbasaur', 25, 25, [tackle, vineWhip], false);
    const squirtle = new Pkmn('Squirtle', 25, 25, [tackle, bubble], false);
    const charmander = new Pkmn('Charmander', 20, 20, [tackle, ember], false);

    const rattata = new Pkmn('Rattata', 15, 15, [tackle, quickAttack], false);
    const pidgey = new Pkmn('Pidgey', 15, 15, [tackle, peck], false);
    const caterpie = new Pkmn('Caterpie', 10, 10, [tackle], false);

    $scope.party = [pikachu, bulbasaur, squirtle, charmander];
    let enemies = [rattata, pidgey, caterpie];

    $scope.pkmn = $scope.party[0];
    $scope.foe = enemies[Math.floor(Math.random() * enemies.length)];

    $scope.result = {
      trainer: '',
      foe: '',
      system: 'A wild ' + $scope.foe.name.toUpperCase() + ' appeared!'
    };

    let battleState = true;
    $scope.fighting = false;
    $scope.list = false;
    $scope.next = false;

    $scope.fight = function() {
      if($scope.foe.hp > 0 && $scope.pkmn.hp > 0 && battleState == true) {
        $scope.fighting = $scope.fighting ? false : true;
        $scope.list = false;

        $scope.selectMove = function(move) {
          doDmg(move.mult);
          if ($scope.foe.hp > 0) {
            foeAtk();
          }

          if ($scope.foe.hp <= 0) {
            $scope.foe.hp = 0;
            $scope.result = {
              trainer: '',
              foe: '',
              system: 'You win!'
            };
            battleState = false;
            $scope.fighting = false;
            $scope.next = true;
          } else if ($scope.pkmn.hp <= 0) {
            $scope.pkmn.hp = 0;

            if (partyCheck() == true) {
              $scope.result = {
                trainer: $scope.pkmn.name.toUpperCase() + ' has fainted!',
                foe: '',
                system: 'Choose your next Pok\xE9mon:'
              };
              $scope.switch();
            } else {
              $scope.result = {
                trainer: '',
                foe: '',
                system: 'TRAINER whited out!'
              };
              battleState = false;
              $scope.fighting = false;
            }
          } else {
            $scope.result = {
              trainer: $scope.pkmn.name.toUpperCase() + ' used ' + move.name.toUpperCase() + '!',
              foe: $scope.foe.name.toUpperCase() + ' used ' + foeMove.toUpperCase() +'!',
              system: ''
            };
          }
        }
      }
    }

    $scope.run = function() {
      if (battleState == true) {
        $scope.fighting = false;
        $scope.list = false;

        if (rng() >= 0.5) {
          $scope.result = {
            trainer: '',
            foe: '',
            system: 'Got away safely!'
          };

          battleState = false;
          $scope.fighting = false;
          $scope.next = true;
        } else {
          foeAtk();
          if ($scope.pkmn.hp > 0) {
            $scope.result = {
              trainer: 'Couldn\'t get away!',
              foe: $scope.foe.name.toUpperCase() + ' used ' + foeMove.toUpperCase() + '!',
              system: ''
            };

          } else if (partyCheck() == true && $scope.pkmn.hp <= 0) {
            $scope.result = {
              trainer: 'Couldn\'t get away!',
              foe: $scope.foe.name.toUpperCase() + ' used ' + foeMove.toUpperCase() + '!',
              system: $scope.pkmn.name.toUpperCase() + ' has fainted! Choose your next Pok\xE9mon:'
            };
            $scope.switch();
          } else {
            $scope.result = {
              trainer: 'Couldn\'t get away!',
              foe: $scope.foe.name.toUpperCase() + ' used ' + foeMove.toUpperCase() + '!',
              system: 'TRAINER whited out!'
            };
            $scope.fighting = false;
            battleState = false;
          }
        }
      }
    }

    $scope.switch = function() {
      if (battleState == true) {
        $scope.list = $scope.list ? false : true;
        $scope.fighting = false;
        $scope.selectPkmn = function(pkmn) {
          if (pkmn.active == false && pkmn.hp != 0) {
            $scope.pkmn.active = false;
            pkmn.active = true;
            $scope.pkmn = pkmn;
            $scope.result = {
              trainer: '',
              foe: '',
              system: 'Go, ' + pkmn.name.toUpperCase() + '!'
            };
            $scope.list = false;
          } else if (pkmn.hp == 0) {
            $scope.result = {
              trainer: '',
              foe: '',
              system: pkmn.name.toUpperCase() + ' is unable to battle!'
            };
          } else {
            $scope.result = {
              trainer: '',
              foe: '',
              system: pkmn.name.toUpperCase() + ' is already in battle!'
            };
          }
        }
      }
    }

    $scope.nextBattle = function() {
      $scope.foe = enemies[Math.floor(Math.random() * enemies.length)];
      $scope.foe.hp = $scope.foe.maxhp;
      $scope.next = false;
      battleState = true;
      $scope.result.system = 'A wild ' + $scope.foe.name.toUpperCase() + ' appeared!';
    }

    $scope.reset = function() {
      $scope.fighting = false;
      $scope.list = false;

      $scope.party.forEach(function(pkmn) {
        pkmn.hp = pkmn.maxhp;
      });

      $scope.nextBattle();
    }

    function atk() {
      return Math.floor(Math.random() * 5) + 1;
    }

    function doDmg(mult) {
      $scope.foe.hp -= (atk()*mult);
      $scope.foe.hp = Math.round($scope.foe.hp);
    }

    function takeDmg(mult) {
      $scope.pkmn.hp -= (atk()*mult);
      $scope.pkmn.hp = Math.round($scope.pkmn.hp);
    }

    function foeAtk() {
      if ($scope.foe.moves.length == 1) {
        mult = $scope.foe.moves[0].mult;
        foeMove = $scope.foe.moves[0].name;
      } else {
        moveIndex = Math.floor(Math.random() * $scope.foe.moves.length);
        moveObj = $scope.foe.moves[moveIndex];
        foeMove = moveObj.name;
        mult = moveObj.mult;
      }
      takeDmg(mult);
    }

    function rng() {
      return Math.random().toFixed(2);
    }

    function partyCheck() {
      let partyHp = 0;
      $scope.party.forEach(function(pkmn) {
        partyHp += pkmn.hp
      });
      if (partyHp > 0) {
        return true;
      } else {
        return false;
      }
    }

  });
})();

/*
todo:
pp
items
ux/ui tweak: stop things from movin around so much
QoL: tooooo many if statements

functions:
bag

visuals:
pkmn images/animations
health bars

gettin fancy:
experience/levels
status
effectiveness/types
accuracy
speed?
catching pokemon??

*/
