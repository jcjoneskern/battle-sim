(function() {

  angular.module('pkmn', [])

  .controller('battleCtrl', function($scope) {
    let battleState = true;

    const moves = [
      {
        name: 'Thundershock',
        mult: 1.2
      },
      {
        name: 'Tackle',
        mult: 1
      },
      {
        name: 'Razor Leaf',
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
    ]

    const party = [
      {
        name: 'Pikachu',
        hp: 20,
        maxhp: 20,
        moves: [moves[0], moves[1]]
      },
      {
        name: 'Bulbasaur',
        hp: 25,
        maxhp: 25,
        moves: [moves[0], moves[2]]
      },
      {
        name: 'Squirtle',
        hp: 25,
        maxhp: 25,
        moves: [moves[0], moves[4]]
      },
      {
        name: 'Charmander',
        hp: 20,
        maxhp: 20,
        moves: [moves[0], moves[3]]
      }
    ];

    const enemies = [
      {
        name: 'Rattata',
        hp: 15,
        maxhp: 15,
        moves: [moves[0]]
      },
      {
        name: 'Pidgey',
        hp: 15,
        maxhp: 15,
        moves: [moves[0], moves[5]]
      },
      {
        name: 'Caterpie',
        hp: 10,
        maxhp: 10,
        moves: [moves[0]]
      }
    ]

    $scope.pkmn = party[0];

    $scope.foe = enemies[0];

    $scope.result = '...';

    $scope.fight = function() {
      if($scope.foe.hp > 0 && $scope.pkmn.hp > 0 && battleState == true) {
        doDmg();
        if ($scope.foe.hp > 0) {
          takeDmg();
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

    function doDmg() {
      $scope.foe.hp -= atk();
      if ($scope.foe.hp <= 0) {
        $scope.foe.hp = 0;
        $scope.result = 'You win!';
        battleState = false;
      }
    }

    function takeDmg() {
      $scope.pkmn.hp -= atk();
      if ($scope.pkmn.hp <= 0) {
        $scope.pkmn.hp = 0;
        $scope.result = 'TRAINER whited out!';
        battleState = false;
      }
    }

    function rng() {
      return Math.random().toFixed(2);
    }
  });

})();

/*
todo:
trainer pkmn objects
enemy pkmn objects
moves
items
experience/levels

functions:
fight
bag
pokemon
run

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
