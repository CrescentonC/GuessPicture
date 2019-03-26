// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

// Reset answer entry to choice number so easier to access.
var question = {
    1: {btnTxts: ['香烟','啤酒','口红','包'], answer: 2},
    2: {btnTxts: ['香烟2','啤酒','口红','包'], answer:0},
    3: {btnTxts: ['香烟3','啤酒','口红','包'], answer:0},
    4: {btnTxts: ['香烟4','啤酒','口红','包'], answer:0},
}

//var questionArr = ['香烟','啤酒','口红','包'];

var flag = false;

cc.Class({
    extends: cc.Component,

    properties: {
        maskPrefab: {
            default: null,
            type: cc.Prefab
        },

        arr: {
            default : [],
            type: cc.Label
        },

        buttonArray:
        {
            default : [],
            type: cc.Button,
        },

        questionId : 0,
        score : 0,

        choicesLeft: 4,

        scoreLable : {
            default: null,
            type: cc.Label
        }

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        /* for(var i = 0; i < 16; i++)
        {
            var node = cc.instantiate(this.maskPrefab);
            node.x = i*50;
            node.y = i*50;
            this.node.addChild(node);
        } */

        console.log(this.node.getChildByName('choicesLayout').children);

        /* for(var i = 0; i < this.node.getChildByName('choicesLayout').children.length; i++)
        {
            this.node.getChildByName('choicesLayout').children[i].getChildByName('Label').getComponent('cc.Label').string = questionArr[i];
        } */

        /* for(var i = 0; i < this.arr.length; i++)
        {
            arr[i].string = questionArr[i];
        } */
        this.setButton(1);
        this.playMusic();
    },

    setButton(questionId)
    {
        flag = true
        if(questionId > 4) return;
        this.questionId = questionId;
        // Change the picture
        var child = this.node.getChildByName('Picture' + this.questionId);
        child.active = true;
        // Set buttons to interactable
        for(var i = 0; i < this.buttonArray.length; i++)
        {
            this.buttonArray[i].interactable = true;
        }
        for(var i = 0; i < this.arr.length; i++)
        {
            this.arr[i].string = question[questionId].btnTxts[i];
        }
        this.choicesLeft = 4;
    },

    selectAnswer(event, id){
        console.log(event);
        console.log(id);
        console.log('selectAnswer ' + id);
        var target = event.target;


        var index;
        for(index = 0; index < question[this.questionId].btnTxts.length; index++)
        {
            if( index == question[this.questionId].answer)
            {
                break;
            }
        }

        if (index == id)
        {
            console.log('Y');
            target.color = cc.color(0,255,0);
            var child = this.node.getChildByName('Picture' + this.questionId);
            child.active = false;
            if(flag)
            {
                this.score += 500;
                flag = false;
            }
        }
        else 
        {
            console.log("N");
            target.color = cc.color(255,0,0);
        }

        this.scoreLable.string = this.score;

        // Set buttons to non-interactable
        for(var i = 0; i < this.buttonArray.length; i++)
        {
            this.buttonArray[i].interactable = false;
            this.choicesLeft = 0;
        }

        setTimeout(function() {
            target.color = cc.color(255,255,255);
            this.setButton(this.questionId + 1);
        }.bind(this), 1000);
    },

    // Function runs when the eliminate choice button is used.
    eliminateOneChoice()
    {
        var choice = Math.floor(Math.random() * 4);
        console.log(choice);
        // Keep picking random choice if it is the answer or it has already been eliminated
        while ((choice == question[this.questionId].answer) || (!(this.buttonArray[choice].interactable)))
        {
            var choice = Math.floor(Math.random() * 4);
            console.log(choice);
        }
        this.buttonArray[choice].interactable = false;
        this.choicesLeft--;
    },

    playMusic(){
        this.node.getComponent('cc.AudioSource').play();
    },

    update (dt)
    {
        // If too few choices left, disable eliminate choice button
        if (this.choicesLeft <= 1)
        {
            this.buttonArray[4].interactable = false;
        } else
        {
            this.buttonArray[4].interactable = true;
        }
    },
});
