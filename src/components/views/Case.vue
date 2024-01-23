 <template lang="">
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:space-between;width:60px;margin-left:20px;height:270px">
        
        <Icon :path="require('@/assets/icons/lifecycle.png')" width="40px" height="40px" downloadPath="/downloads/lifecycle.pdf" name="Lifecycle.cs"/> 
        <Icon :path="require('@/assets/icons/lifecycle.png')" width="40px" height="40px" downloadPath="/downloads/lifecycle-ios.pdf" name="Lifecycle.io"/> 
        
        <Icon :path="require('@/assets/icons/laundry.png')" width="43px" height="43px" downloadPath="/downloads/laundry.pdf" name="Laundry.io"/> 

    </div>
</template>
<script>
import Icon from '../Icon.vue';
export default {
    name: 'Case',
    components:{
        Icon
    }

}
</script>
<style lang="">
    
</style> 



