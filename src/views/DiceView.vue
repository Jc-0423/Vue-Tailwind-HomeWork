<script>
export default {
    data() {
        return {
            maxAttempt: 20,
            rollResults: [],
            count: 0,
        };
    },
    methods: {
        results() {
            while (this.count < this.maxAttempt) {
                let d1 = Math.floor(Math.random() * 6) + 1
                let d2 = Math.floor(Math.random() * 6) + 1
                let d3 = Math.floor(Math.random() * 6) + 1
                this.rollResults.push({ d1, d2, d3 })
                this.count++
                console.log(this.rollResults)

                if (d1 === d2 && d2 === d3) {
                    // this.$el.querySelector('.btn-success').disabled = true;
                    setTimeout(() => {
                        alert('恭喜！骰到三個相同的數字！');
                        this.reset();
                    }, 700);
                    return;
                }
            }

            setTimeout(() => {
                alert('真可惜！請再試一次！');
                this.reset();
            }, 700);

        },
        reset() {
            this.count = 0;
            this.rollResults = [];
            this.$refs.rl.innerHTML = '';
            this.$nextTick(() => {
                this.$el.querySelector('.btn-success').disabled = false;
            });
        }
    }
}
</script>
<template>
    <div class="container-fluid">
        <div class="container">
            <div class="py-5 flex justify-center">
                <button type="button" class="btn btn-success btn-lg px-5 fs-4" :disabled="count >= maxAttempt"
                    @click="results">擲骰子</button>
            </div>
            <div class="flex justify-between py-3">
                <p>次數</p>
                <p>第一顆</p>
                <p>第二顆</p>
                <p>第三顆</p>
            </div>
            <hr>
            <div class="flex flex-col justify-center py-2">
                <div class="flex justify-between" v-for="(roll, index) in rollResults" :key="index">
                    <p>第{{ index + 1 }}次</p>
                    <p>{{ roll.d1 }}</p>
                    <p>{{ roll.d2 }}</p>
                    <p>{{ roll.d3 }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
p {
    margin: 0;
    font-size: 1.2rem;
    font-family: sans-serif;
    font-weight: 600;
}
</style>