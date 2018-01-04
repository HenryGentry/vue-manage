<template>
  <div class="overlay">
    <div id="No4">
		<div class="center">
      <p class="loading">正在加载...请稍后</p>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>
  </div>
</template>

<style>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.25)
}

#No4{width:540px;height:125px;background: #f2f2f2;position: relative;margin:300px auto;overflow: hidden}
#No4 .center{position: relative;left: 15px;top:40%;}
#No4 span{width: 6px;height:6px;background: #1779ba;position: absolute;display: block;border-radius: 5px;left: -30px;animation:No_4 2s infinite ease-out;}
#No4 span:nth-child(2){animation-delay:0.15s;}
#No4 span:nth-child(3){animation-delay:0.3s;}
#No4 span:nth-child(4){animation-delay:0.45s;}
#No4 span:nth-child(5){animation-delay:0.6s;}

@keyframes No_4{
  0%{transform:translateX(0);}
  50%{transform:translateX(236px);}
  51%{transform:translateX(239px);}
  52%{transform:translateX(242px);}
  53%{transform:translateX(245px);}
  54%{transform:translateX(248px);}
  55%{transform:translateX(251px);}
  56%{transform:translateX(254px);}
  57%{transform:translateX(257px);}
  58%{transform:translateX(260px);}
  100%{transform:translateX(510px);}
}

.loading {
  position: relative;
  top: 0px;
  font-size: 1.2rem;
  font-weight: 500;
}
</style>

