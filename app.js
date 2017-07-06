(function() {

  angular.module('pkmn', [])

  .controller('battleCtrl', function($scope) {
    $scope.pkmn = {
      name: 'Pikachu',
      hp: 20,
      maxhp: 20
    };

    $scope.foe = {
      name: 'Rattata',
      hp: 15,
      maxhp: 15
    };

    $scope.result = '...';

    $scope.fight = function() {
      if($scope.foe.hp > 0 && $scope.pkmn.hp > 0) {
        $scope.foe.hp -= atk();
        if ($scope.foe.hp <= 0) {
          $scope.foe.hp = 0;
          $scope.result = 'You win!';
        } else {
          $scope.pkmn.hp -= atk();
          if ($scope.pkmn.hp <= 0) {
            $scope.pkmn.hp = 0;
            $scope.result = 'TRAINER whited out!';
          }
        }
      }
    }


    function atk() {
      return Math.floor(Math.random() * 5) + 1;
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
