<script>
export default {
  data() {
    return {
      gameRecords: [],
      playerWin: 0,
      computerWin: 0,
      resetButton: "none",
    };
  },
  methods: {
    getComputerChoice() {
      return ["石頭", "剪刀", "布"][Math.floor(Math.random() * 3)];
    },
    updateWinRecord(result) {
      if (result === "你獲勝") {
        this.playerWin++;
      } else if (result === "電腦獲勝") {
        this.computerWin++;
      }
      document.getElementById(
        "WoL"
      ).textContent = `你 ${this.playerWin} 勝 ${this.computerWin} 負`;
    },
    startGame() {
      const computerChoice = this.getComputerChoice();
      const playerChoice = document.querySelector('input[name="listGroupRadio"]:checked')
        .nextElementSibling.textContent;

      document.getElementById("com").textContent = computerChoice;
      document.getElementById("you").textContent = playerChoice;

      const result =
        computerChoice === playerChoice
          ? "平手"
          : (computerChoice === "剪刀" && playerChoice === "布") ||
            (computerChoice === "布" && playerChoice === "石頭") ||
            (computerChoice === "石頭" && playerChoice === "剪刀")
          ? "電腦獲勝"
          : "你獲勝";

      document.getElementById("result").textContent = result;

      const record = {
        computer: computerChoice,
        player: playerChoice,
        result: result,
      };

      this.gameRecords.push(record);

      this.updateWinRecord(result);
      this.updateRecord();
      this.block();
    },

    updateRecord() {
      let recordHTML = "<h3>遊戲記錄</h3>";
      this.gameRecords.forEach((record, index) => {
        recordHTML += `<p">第${index + 1}場：結果 ${record.result}</p>`;
      });
      document.getElementById("showdata").innerHTML = recordHTML;
    },

    resetGame() {
      this.gameRecords = [];
      this.playerWin = 0;
      this.computerWin = 0;
      document.getElementById("showdata").innerHTML = "";
      document.getElementById("result").textContent = "";
      document.getElementById("com").textContent = "";
      document.getElementById("you").textContent = "";
      document.getElementById("WoL").textContent = "";
      this.hide();
    },

    block() {
      this.resetButton = "inline";
    },

    hide() {
      this.resetButton = "none";
    },
  },
};
</script>
<template>
  <div class="flex justify-center py-5">
    <div>
      <div>
        <h1 class="py-2 text-6xl">猜拳遊戲</h1>
      </div>
      <div>
        <h5 class="py-6 text-3xl">請選擇剪刀、石頭、布</h5>
      </div>
      <div>
        <span id="time"></span>
      </div>
      <div class="py-5 text-xl">
        <span
          >電腦出拳為：
          <span id="com"></span>
        </span>
      </div>
      <div class="py-5 text-xl">
        <span
          >你出拳為：
          <span id="you"></span>
        </span>
      </div>
      <div class="py-5 text-xl">
        <span> 結果：<span id="result"></span> </span>
      </div>
      <hr />
      <div class="flex justify-between items-center px-5">
        <div class="px-5">
          <input
            class="form-check-input me-1"
            type="radio"
            name="listGroupRadio"
            value=""
            id="firstRadio"
            checked
          />
          <label class="form-check-label text-xl" for="firstRadio">石頭</label>
        </div>
        <div class="px-5">
          <input
            class="form-check-input me-1"
            type="radio"
            name="listGroupRadio"
            value=""
            id="firstRadio"
            checked
          />
          <label class="form-check-label text-xl" for="firstRadio">剪刀</label>
        </div>
        <div class="px-5">
          <input
            class="form-check-input me-1"
            type="radio"
            name="listGroupRadio"
            value=""
            id="firstRadio"
            checked
          />
          <label class="form-check-label text-xl" for="firstRadio">布</label>
        </div>
        <div class="px-5">
          <button
            type="button"
            class="btn btn-success fw-semibold"
            id="submit"
            @click="startGame"
          >
            出拳
          </button>
        </div>
      </div>
      <div class="flex justify-between py-2">
        <div class="text-xl flex items-center" id="WoL"></div>
        <button
          type="reset"
          id="reset"
          class="btn btn-warning fw-semibold"
          @click="resetGame"
          :style="{ display: resetButton }"
        >
          重置
        </button>
      </div>
      <hr />
      <div>
        <span class="text-xl py-2" id="showdata"></span>
      </div>
    </div>
  </div>
</template>
<style></style>
