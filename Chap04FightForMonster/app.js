new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns:[]
    },
    methods: {
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth=100;
            this.monsterHealth=100;
            this.turns = [];
        },
        attack: function(){
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            
            //记录
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            
            if(this.checkWin()){
                return;
            }
            
            
             this.monsterAttacks();
        },
        specialAttack: function(){
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            
            //记录
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for ' + damage
            });
            
            if(this.checkWin()){
                return;
            }
            
            this.monsterAttacks();
        },
        heal:function(){
            if(this.playerHealth<=90){
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            
            //记录
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });
            
            this.monsterAttacks();
        },
        giveUp: function(){
            this.gameIsRunning = false;
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random()*max) + 1,min);
        },
        checkWin: function(){
//            判断边界条件
            if(this.monsterHealth <= 0){
               if(confirm('you won!new game?')){
                   this.startGame();
               } else {
                   this.gameIsRunning=false;
               }
               return true;
            } else if (this.playerHealth <=0){
                if(confirm('you lost!new game?')){
                   this.startGame();
               } else {
                   this.gameIsRunning=false;
               }
               return true;
            }
            return false;
        },
        monsterAttacks: function(){
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            
            //记录
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
        }
    }
});