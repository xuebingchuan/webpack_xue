//引入公共样式
import './style/public.scss'
import './other'
//引入插件
import Euv from "xue-mini-vue";
new Euv({
    el: "#div1",
    data: {
        obj: {
            data: "obj.data",
        },
        ok: true,
        message: "message",
        modelMessage: 1,
        show: true,
        html: "<h2>v-html 😄</h2>",
        list: [1, 2, 3, 4],
        message2: "测试computed + modelMessage：",
        cls: "cls1 cls2",
        style: { fontSize: "30px", color: "#ffff" },
        ifValue: false,
        elifValue: true,
        todolist: [1, 2, 3],
        todoinput: "",
    },
    computed: {
        hello() {
            return this.message2 + this.modelMessage;
        },
        date() {
            return new Date();
        },
    },
    watch: {
        ok(val, oldVal) {
            console.log("watch", val, oldVal);
        },
        modelMessage(val, oldVal) {
            console.log("watch->", "newVal:", val, ", old:", oldVal);
        },
    },
    mounted() {
        setTimeout(() => {
            console.log("old->", JSON.stringify(this.list));
            this.$nextTick(() => {
                console.log("new->", JSON.stringify(this.list));
            });
            this.$nextTick().then(() => {
                console.log("new->", JSON.stringify(this.list));
            });
            this.list = [11, 22];
        }, 1500);
    },
    beforeUpdate() {
        // console.log("beforeUpdate");
    },
    updated() {
        console.log("updated");
    },
    methods: {
        add() {
            this.todolist.push(this.todoinput);
        },
        fn() {
            console.log("fn click");
            this.show = !this.show;
            this.ok = !this.ok;
            this.elifValue = !this.elifValue;
            this.html = "<h1>html innerHTML change</h1>";
            this.list = [11, 22, 22, 44];
            this.cls = this.ok ? "cls3" : "";
            this.style = this.ok
                ? { fontSize: "30px", color: "#ffff" }
                : {
                    color: "#ccc",
                    fontSize: "20px",
                };
        },
        todoFn(item, $event) {
            alert(item);
        },
    },
});
