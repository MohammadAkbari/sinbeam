<script setup lang="ts">
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { onMounted, ref } from 'vue';
import type LineChartDto from './models/lineChartDto';


export interface Props {
  chartData: Array<LineChartDto>;
  labels: Array<string>;
  inversed: boolean;
  yAxisText: string;
  isPoint : boolean
}

const props = withDefaults(defineProps<Props>(), {
  inversed: false,
  isPoint:false
});

const lineChartZoomDiv = ref<HTMLElement | null>(null)


onMounted(() => {
  initChart();
})


const initChart = () => {

  const root = am5.Root.new(lineChartZoomDiv.value);
  root.setThemes([am5themes_Animated.new(root)]);

  const chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "panX",
    pinchZoomX: true,
    pinchZoomY: true,
  }));

  const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
    behavior: "selectX"
  }));
  cursor.lineY.set("visible", false);

  const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 100 });

  xRenderer.labels.template.setAll({
    fontSize: 10,
    // fontFamily:'IRANSans'
  });

  const data = [];

  props.chartData.forEach((item) => {
    const model = { title: item.title };
    item.values.forEach((m, ii) => {
      model['value' + ii] = m;
    });
    data.push(model);
  })
  const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
    renderer: xRenderer,
    
    // min: 0,
    strictMinMax: true
  }));

  xAxis.data.setAll(data);

  console.log(props.inversed)

  const yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 30, inversed: props.inversed });
  yRenderer.labels.template.setAll({
    fontSize: 10,
    // fontFamily:'IRANSans'
  });

  const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    renderer: yRenderer,
    //strictMinMax:true
  }));

  yAxis.children.moveValue(am5.Label.new(root, { text: props.yAxisText, rotation: -90, y: am5.p50, centerX: am5.p50 }), 0);


  props.labels.forEach((item, index) => {
    const series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
      calculateAggregates: true,
      name: item,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value" + index,
      valueXField: "title",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",
        labelText: "[bold]{name}[/]\n x : {valueX} \n y : {valueY}"
      })
    }));

    if(props.isPoint){
      series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: series.get("fill")
        })
      });
    });
    }


    series.set("setStateOnChildren", true);
    series.states.create("hover", {});

    series.mainContainer.set("setStateOnChildren", true);
    series.mainContainer.states.create("hover", {});

    series.strokes.template.states.create("hover", {
      strokeWidth: 4
    });

    series.data.setAll(data);
    series.appear(1000);
    chart.appear(1000, 100);
  });

  let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      })
    );

    legend.itemContainers.template.states.create("hover", {});

    legend.itemContainers.template.events.on("pointerover", function (e) {
      e.target.dataItem.dataContext.hover();
    });
    legend.itemContainers.template.events.on("pointerout", function (e) {
      e.target.dataItem.dataContext.unhover();
    });

    legend.data.setAll(chart.series.values);
}

</script>

<template>
  <div class="lineChart position-relative" ref="lineChartZoomDiv" dir="ltr" style="width: 70%;height:350px">
  </div>
</template>

<style scoped></style>
