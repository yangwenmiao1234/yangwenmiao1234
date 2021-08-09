<template>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      data: [
        {
          id: 1,
          label: "粉料",
          children: [
            {
              id: 1.1,
              label: "水泥类",
            },
            {
              id: 1.2,
              label: "煤灰类",
            },
            {
              id: 1.3,
              label: "矿粉类",
            },
            {
              id: 1.4,
              label: "膨胀剂类",
            },
          ],
        },
        {
          id: 2,
          label: "骨料",
          children: [
            {
              id: 2.1,
              label: "砂子类",
            },
            {
              id: 2.2,
              label: "石1类(<=15mm)",
            },
            {
              id: 2.3,
              label: "石2类(>15mmm)",
            },
            {
              id: 2.4,
              label: "混凝土",
            },
          ],
        },
        {
          id: 3,
          label: "水料",
          children: [
            {
              id: 3.1,
              label: "水类",
            },
            {
              id: 3.2,
              label: "添加剂类",
            },
            {
              id: 3.3,
              label: "油类",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    tree() {
      alert("tree");
      this.checkedNodes = this.$refs.tree.getCheckedNodes();
      console.log(this.checkedNodes);
    },
  },
};
</script>