<template>
	<div class="newpat">
		<div class="head">
			<div class="bordercol">
				<div class="img floatleft"></div>
				<div class="floatleft">
					<div>一朵解语花</div>
					<div class="fontcolor marginTop">
						我的淘豆:15个
					</div>
				</div>
				<div class="floatright fontcolor paddingright borders">
					<i class="iconfont icon-liwu"></i>
					奖品
				</div>
			</div>
			<div>
				<div></div>
			</div>
		</div>
	</div>		
</template>
<script>
export default {
	data() {
	    return {
	      
	    }
	}
}
</script>
<style scoped>
	.img{
		width: 70px;
		height: 90px;
		border:1px solid #dddddd;
		border-radius: 3px;
		background: url('../../assets/images/newuser.png');
		background-repeat: no-repeat;
	    background-position: center;
	    background-size: cover;
	}
	.bordercol{
		height: 140px;
		padding-top: 40px;
		padding-left:40px;
		padding-right: 40px;
	}
	.floatleft{
		float: left;
		padding-left: 20px
	}
	.fontcolor{
		color: #a9a9a9;
		font-size:28px;
	}
	.marginTop{
		margin-top: 12px;
	}
	.floatright{
		float: right;
	}
	.paddingright{
		padding-right: 20px;
	}
	.borders{
		width: 140px;
		height: 60px;
		border: 1px solid #a9a9a9;
		border-radius: 5px;
		text-align: center;
		line-height: 60px;
	}
	.icon-liwu{
		line-height: 60px;
		margin-left: 20px
	}
</style>