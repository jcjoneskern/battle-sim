(function() {

  angular.module('pkmn', [])

  .controller('battleCtrl', function($scope) {
    let party = [
      {
        name: 'Pikachu',
        hp: 20,
        maxhp: 20
      },
      {
        name: 'Bulbasaur',
        hp: 25,
        maxhp: 25
      },
      {
        name: 'Squirtle',
        hp: 25,
        maxhp: 25
      },
      {
        name: 'Charmander',
        hp: 20,
        maxhp: 20
      }
    ];

    let enemies = [
      {
        name: 'Rattata',
        hp: 15,
        maxhp: 15
      },
      {
        name: 'Pidgey',
        hp: 15,
        maxhp: 15
      },
      {
        name: 'Caterpie',
        hp: 10,
        maxhp: 10
      }
    ]

    $scope.pkmn = party[0];

    $scope.foe = enemies[0];

    $scope.result = '...';

    $scope.fight = function() {
      if($scope.foe.hp > 0 && $scope.pkmn.hp > 0) {
        doDmg();
        if ($scope.foe.hp > 0) {
          takeDmg();
        }
      }
    }

    $scope.run = function() {
      if (rng() >= 0.75) {
        $scope.result = 'Got away safely!'
      } else {
        $scope.result = 'Couldn\'t get away!'
        takeDmg();
      }
    }

    function doDmg() {
      $scope.foe.hp -= atk();
      if ($scope.foe.hp <= 0) {
        $scope.foe.hp = 0;
        $scope.result = 'You win!';
      }
    }

    function takeDmg() {
      $scope.pkmn.hp -= atk();
      if ($scope.pkmn.hp <= 0) {
        $scope.pkmn.hp = 0;
        $scope.result = 'TRAINER whited out!';
      }
    }


    function atk() {
      return Math.floor(Math.random() * 5) + 1;
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
experience

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
effectiveness
accuracy
speed?

*/
