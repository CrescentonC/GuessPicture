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
        dotPrefab:
        {
            default: null,
            type: cc.Prefab
        },
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

    },

    spawnNewDot(event)
    {
        console.log(event);
        var x = console.log(event._touches[0]._point.x);
        var y = console.log(event._touches[0]._point.y);

        // var newDot = cc.instantiate(this.dotPrefab)

        // this.node.addChild(newDot);

        // newDot.setPosition(x, y);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad ()
    {
        var x = 0;
        var y = 0;
        while(x*x + y*y < 291600)
        {
            var start_x = Math.floor(Math.random() * 390) - 540;
            var start_y = Math.floor(Math.random() * 1280) - 640;
            var dest_x = Math.floor(Math.random() * 490);
            var dest_y = Math.floor(Math.random() * 1280) - 640;
            var x = dest_x - start_x;
            var y = Math.abs(dest_y - start_y);
        }


        // console.log(start_x);
        // console.log(start_y);
        // console.log(dest_x);
        // console.log(dest_y);

        this.node.getComponent('cc.Graphics').moveTo(start_x, start_y);
        this.node.getComponent('cc.Graphics').lineTo(dest_x, dest_y);
        this.node.getComponent('cc.Graphics').stroke();
    },

    start ()
    {

    },

    // update (dt) {},
});
