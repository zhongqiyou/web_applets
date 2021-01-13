<template>
  <div class="flex">
    <ConcreteList1/>
    <ConcreteList2/>

  </div>
</template>

<script>
import ConcreteList1 from "./concreteList1";
import ConcreteList2 from "./concreteList2";
  export default {
    components: {
      ConcreteList1 ,
      ConcreteList2
    },
    data() {
      return {
      
      }
    },
    
    methods: {
      
    }
  }
</script>

<style scoped>
.flex{
  display: flex;
  justify-content: space-between;
}
</style>
