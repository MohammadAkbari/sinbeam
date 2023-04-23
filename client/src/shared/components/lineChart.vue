<script setup lang="ts">
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { onMounted, ref } from 'vue';
import type LineChartDto from './models/lineChartDto';



export interface Props {
  chartData: Array<LineChartDto>;
  labels: Array<string>;

}

const props = withDefaults(defineProps<Props>(), {

});

const lineChartZoomDiv = ref<HTMLElement | null>(null)


onMounted(() => {
  initChart();
})


const initChart =() => {

    const root = am5.Root.new(lineChartZoomDiv.value);    
    root.setThemes([am5themes_Animated.new(root)]);
  
    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "panX",
      pinchZoomX:true,
      pinchZoomY:true
    }));

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "selectX"
    }));
    cursor.lineY.set("visible", false);    

    const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 100});

    xRenderer.labels.template.setAll({
      rotation: 45,
      fontSize:10,
      // fontFamily:'IRANSans'
    });

    const data = [];

    props.chartData.forEach((item) => {
      const model = {title : item.title};
        item.values.forEach((m,ii) =>{
          model['value' + ii]=m;
      });
      data.push(model);
    })
    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      renderer: xRenderer,
      min: 0
    }));
    
    xAxis.data.setAll(data);

    const yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 30,inversed:true});
    yRenderer.labels.template.setAll({  
      fontSize:10,
      // fontFamily:'IRANSans'
    });
        
    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: yRenderer,
      min: 0
    }));
    
    yAxis.children.moveValue(am5.Label.new(root, { text: "Bending Moment (kNm)", rotation: -90, y: am5.p50, centerX: am5.p50 }), 0);
    
      
    props.labels.forEach((item,index)=>{  
      const series = chart.series.push(am5xy.LineSeries.new(root, { 
        calculateAggregates: true,
        name: item,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value"+index, 
        valueXField: "title",    
        // categoryXField:'title',
        // tooltip: am5.Tooltip.new(root, {
        //   pointerOrientation: "horizontal",
        //   labelText: "[bold]{name}[/]\n {categoryX} : {valueY}"
        // })
      }));






//       var bubbleSeries = chart.series.push(am5xy.LineSeries.new(root, {
//   calculateAggregates: true,
//   xAxis: xAxis,
//   yAxis: yAxis,
//   valueYField: "y",
//   valueXField: "x",
//   valueField: "value"
// }));

  //  series.bullets.push(function() {
  //       return am5.Bullet.new(root, {
  //         sprite: am5.Circle.new(root, {           
  //           fill: series.get("fill")
  //         })
  //       });
  //  });
  //  const tooltip = am5.Tooltip.new(root, {
  //   getFillFromSprite: false,
  //   autoTextColor : false,
  //   getLabelFillFromSprite: false,
  //   labelText: "[bold]{name}[/]\n {categoryX} : {valueY}"
  // });
  
  // tooltip.get("background").setAll({
  //   fill: am5.color(0x000000),
  //   fillOpacity: 0.8
  // });
  // tooltip.label.setAll({
  //   fill: am5.color(0xffffff)
  // });
  // series.set("tooltip", tooltip);
      series.data.setAll(data);  
      series.appear(1000);
      chart.appear(1000, 100);

    });
    
  }



</script>

<template>
  <div class="lineChart position-relative" ref="lineChartZoomDiv" dir="ltr"
    style="width: 100%;height:500px">
  </div>
</template>

<style scoped></style>
