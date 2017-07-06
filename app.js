(function() {

  angular.module('pkmn', [])

  .controller('battleCtrl', function($scope) {
    let battleState = true;

    const attacks = [
      {
        name: 'Tackle',
        mult: 1
      },
      {
        name: 'Thunder Shock',
        mult: 1.2
      },
      {
        name: 'Vine Whip',
        mult: 1.2
      },
      {
        name: 'Ember',
        mult: 1.2
      },
      {
        name: 'Bubble',
        mult: 1.2
      },
      {
        name: 'Peck',
        mult: 1.1
      },
      {
        name: 'Quick Attack',
        mult: 1.1
      }
    ];

    $scope.party = [
      {
        name: 'Pikachu',
        hp: 20,
        maxhp: 20,
        moves: [attacks[0], attacks[1]],
        active: true
      },
      {
        name: 'Bulbasaur',
        hp: 25,
        maxhp: 25,
        moves: [attacks[0], attacks[2]],
        active: false
      },
      {
        name: 'Squirtle',
        hp: 25,
        maxhp: 25,
        moves: [attacks[0], attacks[4]],
        active: false
      },
      {
        name: 'Charmander',
        hp: 20,
        maxhp: 20,
        moves: [attacks[0], attacks[3]],
        active: false
      }
    ];

    let enemies = [
      {
        name: 'Rattata',
        hp: 15,
        maxhp: 15,
        moves: [attacks[0], attacks[6]]
      },
      {
        name: 'Pidgey',
        hp: 15,
        maxhp: 15,
        moves: [attacks[0], attacks[5]]
      },
      {
        name: 'Caterpie',
        hp: 10,
        maxhp: 10,
        moves: [attacks[0]]
      }
    ];

    $scope.pkmn = $scope.party[0];

    $scope.foe = enemies[Math.floor(Math.random() * enemies.length)];

    $scope.result = {
      trainer: '',
      foe: '',
      system: 'A wild ' + $scope.foe.name.toUpperCase() + ' appeared!'
    };

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
      console.log('click');
      battleState = true;
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
trainer pkmn objects //made
enemy pkmn objects //made
moves //made
pp
items
choose next pokemon when fainted //done
next encounter //done
ux tweak: make result an object so that info can be arranged better //done
ux/ui tweak: stop things from movin around so much

functions:
fight //made
bag
pokemon //made
run //made

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
