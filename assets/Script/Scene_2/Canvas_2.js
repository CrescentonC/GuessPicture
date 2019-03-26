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
        // dotPrefab:
        // {
        //     default: null,
        //     type: cc.Prefab
        // },
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

    },

    spawnNewDot(event)
    {
        // Get the touch coordinates of the point
        var x = event._touches[0]._point.x - 540;
        var y = event._touches[0]._point.y - 960;

        // Draw the dot only if the line is touched.
        if (x > this.start_x && x < this.dest_x)
        {
            var tmp_y = this.gradient * x + this.y_intercept;
            if (Math.abs(y - tmp_y) < 25)
            {
                y = tmp_y;
                this.node.getComponent('cc.Graphics').circle(x, y, 10);
                this.node.getComponent('cc.Graphics').fill();
            } 
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad ()
    {
        // Draw a big enough random line.
        var x = 0;
        var y = 0;
        while(x*x + y*y < 291600)
        {
            this.start_x = Math.floor(Math.random() * 390) - 540;
            this.start_y = Math.floor(Math.random() * 1280) - 640;
            this.dest_x = Math.floor(Math.random() * 490);
            this.dest_y = Math.floor(Math.random() * 1280) - 640;
            var x = this.dest_x - this.start_x;
            var y = Math.abs(this.dest_y - this.start_y);
        }
        this.gradient = (this.dest_y - this.start_y) / (this.dest_x - this.start_x);
        this.y_intercept = this.dest_y - this.gradient * this.dest_x;

        this.node.getComponent('cc.Graphics').moveTo(this.start_x, this.start_y);
        this.node.getComponent('cc.Graphics').lineTo(this.dest_x, this.dest_y);
        this.node.getComponent('cc.Graphics').stroke();
    },

    start ()
    {

    },

    // update (dt) {},
});
