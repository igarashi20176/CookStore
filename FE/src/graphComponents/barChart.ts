import { defineComponent, h, PropType } from 'vue'
import { Nutriton } from "../models/Types";

import { Bar } from 'vue-chartjs'
import data from "../models/nut_requirement.json"

const data_demo = {
    prop1: 10,
    prop2: 20,
    prop3: 30
} 

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default defineComponent({
  name: 'Bar2Chart',
  components: {
    Bar
  },
  props: {
    data: {
        type: Object,
        default: null 
    },
    color: {
      type: String,
      default: "#333"
    },
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {}
    },
    plugins: {
      type: Array as PropType<Plugin<'bar'>[]>,
      default: () => []
    }
  },

  setup(props) {
    const chartData = {
      labels: Object.keys(props.data).map( (k: string) => k ),
      datasets: [
        {
          label: '各栄養素の摂取割合 (%)',
          backgroundColor: props.color,
          data: Object.keys(props.data).map( k => Math.round(props.data[k] / data[k] * 100) )
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    return () =>
      h(Bar, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      })
  }

    //   labels: [
    //     'nat',
    //     'kal',
    //     'calc',
    //     'iron',
    //     'mag',
    //     'zinc',
    //   ],

    //   data: [
    //     Math.round(props.nut.nat / data.nat * 100),
    //     Math.round(props.nut.kal / data.kal * 100),
    //     Math.round(props.nut.calc / data.calc * 100),
    //     Math.round(props.nut.iron / data.iron * 100),
    //     Math.round(props.nut.mag / data.mag * 100),
    //     Math.round(props.nut.zinc / data.zinc * 100),
    //   ]
})
