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

    let party = [
      {
        name: 'Pikachu',
        hp: 20,
        maxhp: 20,
        moves: [attacks[0], attacks[1]]
      },
      {
        name: 'Bulbasaur',
        hp: 25,
        maxhp: 25,
        moves: [attacks[0], attacks[2]]
      },
      {
        name: 'Squirtle',
        hp: 25,
        maxhp: 25,
        moves: [attacks[0], attacks[4]]
      },
      {
        name: 'Charmander',
        hp: 20,
        maxhp: 20,
        moves: [attacks[0], attacks[3]]
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

    $scope.pkmn = party[0];

    $scope.foe = enemies[0];

    $scope.result = '---';

    $scope.fighting = false;

    $scope.fight = function() {
      if($scope.foe.hp > 0 && $scope.pkmn.hp > 0 && battleState == true) {
        $scope.fighting = $scope.fighting ? false : true;
        $scope.selectMove = function(move) {
          doDmg(move.mult);
          if ($scope.foe.hp > 0) {
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
        if (rng() >= 0.75) {
          $scope.result = 'Got away safely!'
          battleState = false;
        } else {
          $scope.result = 'Couldn\'t get away!'
          takeDmg();
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

    function rng() {
      return Math.random().toFixed(2);
    }
  });

})();

/*
todo:
trainer pkmn objects //made
enemy pkmn objects
moves //made
pp
items
experience/levels

functions:
fight //made
bag
pokemon
run //made

visuals:
pkmn images/animations
health bars

gettin fancy:
status
effectiveness/types
accuracy
speed?
catching pokemon??

*/
