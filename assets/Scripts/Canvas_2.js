// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class(
{
    
    extends: cc.Component,

    properties:
    {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        // For calculating the random line
        start_x:0,
        start_y:0,
        dest_x: 0,
        dest_y: 0,
        gradient: 0,
        y_intercept: 0,
        selection_x:0,
        WinOrLose:
        {
            default: null,
            type: cc.Label,
        }
    },

    spawnNewDot(event)
    {
        this.resetSelection();
        // Get the touch coordinates of the point
        var x = Math.round(event._touches[0]._point.x - this.node.width/2);
        console.log('x =' + x);
        var y = event._touches[0]._point.y - this.node.height/2;
        console.log('y = '+y);

        // Draw the dot only if the line is touched.
        if (x > this.start_x && x < this.dest_x)
        {
            var tmp_y = this.gradient * x + this.y_intercept;
            console.log('tmp_y = ' +tmp_y);
            if (Math.abs(y - tmp_y) < 25)
            {
                y = tmp_y;
                console.log('y =' + y);
                this.node.getComponent('cc.Graphics').circle(x, y, 10);
                this.node.getComponent('cc.Graphics').fill();
            } 
        }
        this.selection_x = x;
        console.log('selectx = ' +this.selection_x);
    },

    resetSelection()
    {
        this.node.getComponent('cc.Graphics').clear();
        this.node.getComponent('cc.Graphics').moveTo(this.start_x, this.start_y);
        this.node.getComponent('cc.Graphics').lineTo(this.dest_x, this.dest_y);
        this.node.getComponent('cc.Graphics').stroke();
        this.WinOrLose.string = "";
    },

    confirmSelection()
    {
        if (Math.abs(((this.selection_x - this.start_x) / (this.dest_x - this.start_x)) - 0.5) < 0.01)
        {
            this.WinOrLose.string = "You Win!";
        } else
        {
            this.WinOrLose.string = "You Lose!";
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad ()
    {
        // Draw a big enough random line.
        var x = 0;
        var y = 0;
        while(x < (this.node.width / 2))
        {
            this.start_x = Math.floor(Math.random() * (this.node.width / 2)) - (this.node.width / 2);
            this.start_y = Math.floor(Math.random() * 100) - 50;
            // console.log(this.start_y);
            this.dest_x = Math.floor(Math.random() * (this.node.width / 2));
            this.dest_y = Math.floor(Math.random() * 100) - 50;
            // console.log(this.dest_y);
            var x = this.dest_x - this.start_x;
            var y = Math.abs(this.dest_y - this.start_y);
            // console.log(y);
        }
        this.gradient = (this.dest_y - this.start_y) / (this.dest_x - this.start_x);
        // console.log(this.gradient);
        this.y_intercept = this.dest_y - this.gradient * this.dest_x;
        // console.log(this.y_intercept);

        this.node.getComponent('cc.Graphics').moveTo(this.start_x, this.start_y);
        this.node.getComponent('cc.Graphics').lineTo(this.dest_x, this.dest_y);
        this.node.getComponent('cc.Graphics').stroke();
    },

    start ()
    {

    },

    // update (dt) {},
});
