<script>
export default {
    data() {
        return {
            height: null,
            weight: null,
            bmi: null,
            thinColor: '',
            healthColor: '',
            heavyColor: '',
            tooheavyColor: '',
        }
    },
    methods: {
        calculateBmi() {
            if (this.height === '' || this.weight === '' || this.height === '0' || this.weight === '0' || this.height > '300' || this.weight > '700' || this.height < '0' || this.weight < '0') {
                alert('請輸入有效的身高和體重值。');
            } else {
                this.bmi = parseFloat((this.weight / ((this.height / 100) * (this.height / 100))).toFixed(1));
                console.log(typeof this.bmi);

                this.thinColor = '';
                this.healthColor = '';
                this.heavyColor = '';
                this.tooheavyColor = '';

                if (this.bmi < 18.5) {
                    this.thinColor = '#C1D7AE';
                } else if (this.bmi < 24) {
                    this.healthColor = '#8CC084';
                } else if (this.bmi < 27) {
                    this.heavyColor = '#ECDCB0';
                } else {
                    this.tooheavyColor = '#FFCAB1';
                }
            }
        }
    }
}



</script>
<template>
    <div class="flex flex-wrap justify-center m-0 px-0 py-5">
        <div class="p-0 flex-none w-full flex justify-center">
            <h2 class="text-4xl">
                BMI 計算機
            </h2>
        </div>
        <div class="flex flex-wrap justify-center p-0 m-0">
            <form class="flex-none w-full justify-center w-50 py-5">
                <div class="mb-3">
                    <label class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700 py-2 text-xl">身高</label>
                    <input type="number" oninput="if(value>300)value=300; if(value<0)value=0;value=value;"
                        placeholder="請輸入身高(公分)" class="form-control mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 placeholder:italic" v-model.number="height" required>
                </div>
                <div class="mb-3">
                    <label class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-slate-700 py-2 text-xl">體重</label>
                    <input type="number" oninput="if(value>700)value=700; if(value<0)value=0;value=value;"
                        placeholder="請輸入體重(公斤)" class="form-control mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 placeholder:italic" v-model.number="weight" required>
                </div>
                <div class="flex justify-end py-2">
                    <button type="button" id="submit" class="btn btn-success fs-5 px-4 fw-regular text-rose-900 text-lg" @click="calculateBmi">送出</button>
                </div>
                <div class="py-3">
                    <span class="text-2xl">{{ bmi }}</span>
                </div>
            </form>
            <div class="flex-none w-full w-75 py-5 text-lg font-sans">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item flex justify-between px-2" id="thin"
                        :style="{backgroundColor: thinColor}">BMI ≤ 18.5 <p class="m-0">
                            「體重過輕」，需要多運動，均衡飲食，以增加體能，維持健康！
                            </p>
                    </li>
                    <li class="list-group-item flex justify-between px-2" id="health"
                        :style="{backgroundColor: healthColor}">18.5 ≤ BMI  ≤ 24 <p class="m-0">
                            恭喜！「健康體重」，要繼續保持！
                            </p>
                    </li>
                    <li class="list-group-item flex justify-between px-2" id="heavy"
                        :style="{backgroundColor: heavyColor}">24 ≤ BMI ≤ 27 <p class="m-0">
                            「體重過重」了，要小心囉，趕快力行「健康體重管理」！
                            </p>
                    </li>
                    <li class="list-group-item flex justify-between px-2" id="tooheavy"
                        :style="{backgroundColor: tooheavyColor}">BMI ≥ 27
                        <p class="m-0">
                            啊～「肥胖」，需要立刻力行「健康體重管理」囉！
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style></style>