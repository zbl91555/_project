<template>
	<transition name="slide">
		<div class="keyboard animated" v-show="show" @click.stop.prevent="fn">
			<!-- 完成 按钮-->
			<div class="done">
				<span class="title">价格（元）</span>
				<p class="text" @click.stop="complete">完成</p>
			</div>
			<!-- 键盘区域 -->
			<div class="list">
				<div class="key" @click.stop="typing('1')">
					<div class="number">
						1
					</div>
				</div>
				<div class="key" @click.stop="typing('2')">
					<div class="number">
						2
					</div>
					<div class="letter">
						ABC
					</div>
				</div>
				<div class="key" @click.stop="typing('3')">
					<div class="number">
						3
					</div>
					<div class="letter">
						DEF
					</div>
				</div>
				<div class="key" @click.stop="typing('4')">
					<div class="number">
						4
					</div>
					<div class="letter">
					GHI
				</div>
				</div>
				<div class="key" @click.stop="typing('5')">
					<div class="number">
						5
					</div>
					<div class="letter">
					JKL
				</div>
				</div>
				<div class="key" @click.stop="typing('6')">
					<div class="number">
						6
					</div>
					<div class="letter">
					MNO
				</div>
				</div>
				<div class="key" @click.stop="typing('7')">
					<div class="number">
						7
					</div>
					<div class="letter">
					PQRS
				</div>
				</div>
				<div class="key" @click.stop="typing('8')">
					<div class="number">
						8
					</div>
					<div class="letter">
					TUV
				</div>
				</div>
				<div class="key" @click.stop="typing('9')">
					<div class="number">
						9
					</div>
					<div class="letter">
					WXYZ
				</div>
				</div>
				<div class="key othernum"
					@click.stop="typing('00')">00
				</div>
				<div class="key"  style="line-height: 50px;"
					@click.stop="typing('0')">0</div>
				<div class="key delete"
					@click.stop="typing('')"
					>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
export default {
  data () {
    return {
      isShow: ''
    }
  },
  props: ['show'],
  methods: {
    /* 防止点击完成按钮左边的空白区域收起键盘 */
    fn () {},
    /* 输入 */
    typing (val) {
      this.$emit('typing', val)
    },
    /* 点击完成 */
    complete () {
      this.$emit('complete')
    }
  }
}
</script>
<style scoped lang="less">
	.keyboard {
		width: 100%;
		position: fixed;
		bottom: 0;
		background: white;
		max-width:750px;
		margin:0 auto;
		z-index: 9999;
		.done {
			height: 100px;
			width: 100%;
			background: #F0F0F0;
			border-top: 1px solid #cacaca;
			font-size: 24px;
			span{
				line-height: 100px;
				float: left;
				text-align: center;
				min-width: 200px;
				font-size:32px;
			}
			.text {
				float: right;
				width: 150px;
				height: 100px;
				background-size: 30px;
				line-height: 100px;
				font-size: 32px;
				text-align: center;
				color: #9e2026;
			}
		}
		.list {
			width: 100%;
			background: #fff;
			display: table;
			.key:active {
				background: #e2e2e2;
			}
			.key {
				position: relative;
				width: 33.15%;
					border-right: 1px solid #b3b3b3;
					border-bottom: 1px solid #b3b3b3;
				height: 100px;
				max-height: 100px;
				float: left;
				font-size: 40px;
				font-family: "Helvetica neue", Verdana, Geneva, sans-serif;
				text-align: center;
				background: #fff;
				line-height: 1;
				margin: 0;
				border-radius: 0;
			}
			.key:nth-child(3n) {
				border-right: none;
			}
		}
	}
	.animated {
		animation-duration: .2s;
		animation-fill-mode: both;
	}
	@keyframes slideInDown {
		from {
			transform: translate3d(0, 0, 0);
			visibility: visible;
		}
		to {
			transform: translate3d(0, 100%, 0);
			display: none;
		}
	}
	@keyframes slideInUp {
		from {
			transform: translate3d(0, 100%, 0);
			visibility: visible;
		}
		to {
			transform: translate3d(0, 0, 0);
		}
	}
	.slide-enter-active {
		animation-name: slideInUp;
	}
	.slide-leave-active {
		animation-name: slideInDown;
	}

	.letter {
		font-size: 24px;
		color: #000;
		padding-bottom: 15px;
	}
	.number {
		padding-top: 15px;
		color: #000;
	}
	.keyboard .list .delete {
		background-image: url(../../assets/images/backspace.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 60px;
		background-color: #D1D5DA;
	}
	.keyboard .list .othernum {
		background-color: #D1D5DA;
		line-height: 100px;
	}
</style>
