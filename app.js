(function() {

  angular.module('pkmn', [])

  .controller('battleCtrl', function($scope) {
    let battleState = true;

    const attacks = [
      {
        name: 'Thunder Shock',
        mult: 1.2
      },
      {
        name: 'Tackle',
        mult: 1
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
        moves: [attacks[1], attacks[6]]
      },
      {
        name: 'Pidgey',
        hp: 15,
        maxhp: 15,
        moves: [attacks[1], attacks[5]]
      },
      {
        name: 'Caterpie',
        hp: 10,
        maxhp: 10,
        moves: [attacks[1]]
      }
    ];

    $scope.pkmn = $scope.party[0];

    $scope.foe = enemies[0];

    $scope.result = 'A wild ' + $scope.foe.name.toUpperCase() + ' appeared!';

    $scope.fighting = false;
    $scope.list = false;

    $scope.fight = function() {
      if($scope.foe.hp > 0 && $scope.pkmn.hp > 0 && battleState == true) {
        $scope.fighting = $scope.fighting ? false : true;
        $scope.selectMove = function(move) {
          doDmg(move.mult);
          if ($scope.foe.hp > 0) {
            foeAtk();
          }

          if ($scope.foe.hp <= 0) {
            $scope.foe.hp = 0;
            $scope.result = 'You win!'
            battleState = false;
          } else if ($scope.pkmn.hp <= 0) {
            $scope.pkmn.hp = 0;
            $scope.result = 'TRAINER whited out!'
            battleState = false;
          } else {
            $scope.result = $scope.pkmn.name.toUpperCase() + ' used ' + move.name.toUpperCase() + '! ' + $scope.foe.name.toUpperCase() + ' used ' + foeMove.toUpperCase() +'!';
          }
        }
      }
    }

    $scope.run = function() {
      if (battleState == true) {
        console.log(rng());
        if (rng() >= 0.5) {
          $scope.result = 'Got away safely!'
          battleState = false;
        } else {
          foeAtk();
          console.log(foeMove);
          if ($scope.pkmn.hp > 0) {
            $scope.result = 'Couldn\'t get away! ' + $scope.foe.name.toUpperCase() + ' used ' + foeMove.toUpperCase() + '!';
          } else {
            $scope.result = 'Couldn\'t get away! ' + $scope.foe.name.toUpperCase() + ' used ' + foeMove.toUpperCase() + '! TRAINER whited out!';
            battleState = false;
          }
        }
      }
    }

    $scope.switch = function() {
      if (battleState == true) {
        $scope.list = $scope.list ? false : true;
        $scope.selectPkmn = function(pkmn) {
          console.log(pkmn);
        }
      }
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
  });

})();

/*
todo:
trainer pkmn objects //made
enemy pkmn objects //made
moves //made
pp
items

functions:
fight //made
bag
pokemon
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
