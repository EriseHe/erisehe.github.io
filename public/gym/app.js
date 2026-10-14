(function(){
"use strict";
const KEY="erise-gym-v1", weekdays=["周一","周二","周三","周四","周五","周六","周日"];
const WARM=["serratus","wall"];
const A=["row","lateral","floorpress","curl","triceps","external"];
const B=["rdl","squat","hip","calf","deadbug"];
const PLAN=[
{type:"A",name:"A · 肩胛与肩臂增肌",tag:"力量日",duration:"40–50 分钟",description:"练上背、肩宽与上臂厚度，兼顾肩袖稳定。每次先做 5–7 分钟低负荷肩胛热身。",note:"先找稳定、无痛的动作幅度。不要为了把右肩胛「压平」而用力夹背。"},
{type:"light",name:"肩胛轻量练习",tag:"主动恢复",duration:"约 6–8 分钟",description:"只做轻负荷肩胛控制，不追求酸胀，也不需要额外增加手臂训练。",note:"这是可选的低疲劳练习。如果肩部不舒服，请暂停并咨询专业人员。"},
{type:"B",name:"B · 下肢与核心稳定",tag:"力量日",duration:"30–40 分钟",description:"训练臀腿和核心，为走路、久坐和架子鼓踏板动作建立基础力量。",note:"右脚外八的原因尚未确认：练习时维持自然、舒适的脚尖朝向，不要硬扭回正。"},
{type:"light",name:"肩胛轻量练习",tag:"主动恢复",duration:"约 6–8 分钟",description:"只做轻负荷肩胛控制，今天让力量训练的肌肉恢复。",note:"如果前两天仍明显酸痛或疲劳，今天可以完全休息。"},
{type:"A",name:"A · 肩胛与肩臂增肌",tag:"力量日",duration:"40–50 分钟",description:"重复周一的上肢训练。尽量追求动作质量一致，而不是周五一定举得更重。",note:"高精细度的钢琴和架子鼓练习建议在大重量训练前，或与健身错开进行。"},
{type:"walk",name:"自由活动与恢复",tag:"轻活动",duration:"15–30 分钟（可选）",description:"舒适散步、轻松活动身体，不安排重负荷或强迫姿势纠正。",note:"自然走路，观察但不要强行扭转右脚。若脚跟经常碰到另一只脚踝，建议做现场步态评估。"},
{type:"rest",name:"完整休息日",tag:"休息",duration:"无需训练",description:"休息是计划的一部分。让肩膀、手臂和下肢有时间恢复。",note:"如果有持续疼痛、麻木、明显无力或新的绊倒问题，请寻求线下医疗评估。"}
];
const E={
serratus:{name:"仰卧前锯肌推拳",en:"Supine Serratus Punch",focus:"肩胛控制 · 前锯肌",tag:"热身",reps:"10–12 次 / 侧",perSide:true,rest:30,minutes:3,weight:"徒手，或约 0.5–1 kg",brief:"通过肩胛骨沿胸廓滑动，把手轻轻伸高几厘米。",steps:["仰卧、屈膝，一只手伸直朝向天花板；另一只手放在身边。","保持肘部基本伸直，轻轻将拳头向天花板再伸高一点，感觉肩胛随之移动。","停顿约 1 秒，然后用 2–3 秒缓慢回落；两侧都做。"],feel:"腋下至肋骨侧方轻微发力；肩胛能自然移动。",avoid:"不要反复屈伸肘部、耸肩、憋气或用大重量猛推。"},
wall:{name:"前臂靠墙滑臂",en:"Forearm Wall Slide",focus:"肩胛上旋 · 控制",tag:"热身",reps:"6–8 次",rest:30,minutes:3,weight:"徒手；需要一面墙",brief:"小幅向上滑动，让肩胛自然转动，而不是夹紧肩膀。",steps:["面对墙站立，两前臂贴墙，肘部略低于肩膀，双脚与髋同宽。","前臂轻轻压墙，缓慢向上滑，保持肋骨与腰部稳定。","在你能控制、无痛的高度停止，然后缓慢下滑回起点。"],feel:"肩膀周围发力均匀，不需要把肩胛骨锁住。",avoid:"不要腰部后仰、肩颈明显紧绷或硬抬到头顶。"},
row:{name:"单臂哑铃划船",en:"Single-arm Dumbbell Row",focus:"上背 · 肩胛控制",tag:"力量",reps:"10–12 次 / 侧",perSide:true,rest:75,minutes:6,weight:"轻至中等哑铃",brief:"用上背拉起重量，躯干不跟着扭转。",steps:["一脚在前、一脚在后，髋部向后折；空着的手稳稳撑在前侧大腿上。","持哑铃的手自然垂下，背部保持平稳；把肘部沿身侧拉向臀部方向。","到手肘接近躯干时即可停下，再用约 2 秒放回；两侧做相同次数。"],feel:"背部和上臂后侧在发力，不应主要靠耸肩或甩腰。",avoid:"不要把肘甩到身后、扭动上半身，或用肩胛死命往中间夹。"},
lateral:{name:"哑铃侧平举",en:"Dumbbell Lateral Raise",focus:"肩宽 · 三角肌中束",tag:"增肌重点",reps:"12–20 次",rest:60,minutes:5,weight:"很轻的哑铃开始",brief:"小重量、慢动作，这是视觉上增宽肩膀的重要训练。",steps:["双脚站稳，肩颈放松，两手持轻哑铃置于身体两侧，肘部微屈。","沿略微靠前的方向抬起双臂，抬到肩高以内、能稳定控制的位置。","缓慢放下，不借助身体摇摆；最后几次也保持同样节奏。"],feel:"肩膀外侧发力，脖子不需要顶着用力。",avoid:"不要甩哑铃、拇指朝下强行「倒水」、或为了抬高而耸肩。"},
floorpress:{name:"中立握哑铃地板卧推",en:"Neutral-grip Floor Press",focus:"胸部 · 肱三头肌",tag:"力量",reps:"8–12 次",rest:75,minutes:6,weight:"轻至中等哑铃",brief:"在地板上推举，比深幅卧推更容易控制下降范围。",steps:["仰卧地面，屈膝，两只哑铃放在胸侧，掌心相对，手腕稳定。","向上推起，手臂接近伸直即可；肩部和肋骨维持自然姿势。","缓慢降到上臂轻触地面，再推起。训练结束时将哑铃安全地落在身体两侧。"],feel:"胸部与上臂后侧工作，没有肩关节前侧刺痛。",avoid:"不要砸肘、拱腰借力，或拿无法安全起落的重量。"},
curl:{name:"哑铃弯举",en:"Dumbbell Biceps Curl",focus:"上臂前侧 · 肱二头肌",tag:"增肌",reps:"10–15 次",rest:60,minutes:5,weight:"能保持肘部稳定的重量",brief:"让大臂前侧更厚实，不靠甩腰增加次数。",steps:["站稳，掌心向前握哑铃，两肘自然靠近身体两侧。","保持上臂基本不向前甩，弯曲肘部，把哑铃平稳抬向肩部。","短暂停顿后用约 2–3 秒控制下降。"],feel:"上臂前侧发力，手腕不需要过度弯曲。",avoid:"不要后仰、摆动肩膀或用下背弹起哑铃。"},
triceps:{name:"仰卧哑铃三头臂屈伸",en:"Lying Triceps Extension",focus:"上臂后侧 · 肱三头肌",tag:"增肌",reps:"10–15 次",rest:60,minutes:5,weight:"非常轻的哑铃开始",brief:"增加大臂后侧厚度；无法稳定控制时先用地板卧推代替。",steps:["仰卧屈膝，两手持轻哑铃，手臂在胸口上方伸直，掌心相对。","上臂尽量稳定，只弯曲肘部，让哑铃缓慢朝头部两侧下降。","在舒适范围内伸直肘部返回，不锁死，不让哑铃横越面部。"],feel:"上臂后侧发力，肘与肩没有疼痛。",avoid:"不要突然放下、过度张开肘部或在疲劳时使用大重量。"},
external:{name:"侧卧哑铃肩外旋",en:"Side-lying External Rotation",focus:"肩袖 · 旋转肌",tag:"稳定",reps:"10–15 次 / 侧",perSide:true,rest:45,minutes:6,weight:"先徒手，约 0.5–1 kg 起",brief:"低负重控制肩关节旋转，帮助肩部稳定。",steps:["侧卧在地板上，下方手臂舒适放置，上方手肘屈曲约 90° 并贴近身体。","保持肘部靠在腰侧附近，缓慢把前臂向外上方旋转。","不需要超过舒适角度，再用约 3 秒放下；两侧均衡练习。"],feel:"肩膀后侧轻微发力，身体保持侧卧不滚动。",avoid:"不要扭腰翻身、肘部离开身体或拿太重的哑铃。"},
rdl:{name:"哑铃罗马尼亚硬拉",en:"Dumbbell Romanian Deadlift",focus:"臀部 · 腘绳肌",tag:"力量",reps:"8–12 次",rest:90,minutes:7,weight:"轻至中等哑铃",brief:"从髋部折叠，而不是低头弯腰去找地面。",steps:["双脚与髋同宽，手持哑铃置于身体前侧，膝盖轻微弯曲。","臀部向后移，躯干随髋部折叠，哑铃贴近腿缓慢下降。","下降到腿后侧有适度拉伸且腰背仍稳定的位置，踩稳脚把臀部带回站立。"],feel:"臀部、大腿后侧发力，背部保持稳定。",avoid:"不要为了碰地而弓腰、膝盖锁死或把哑铃离腿太远。"},
squat:{name:"高脚杯深蹲",en:"Goblet Squat",focus:"股四头肌 · 臀肌",tag:"力量",reps:"8–12 次",rest:90,minutes:7,weight:"从徒手或轻哑铃开始",brief:"用可控制的下蹲深度训练双腿稳定。",steps:["双脚放在舒适的间距、脚尖自然角度，双手把一只哑铃竖抱在胸前。","屈髋、屈膝缓慢下蹲，足跟保持接触地面，膝盖大体沿脚尖方向移动。","只蹲到你能保持平衡和背部稳定的位置，再平稳站起。"],feel:"大腿和臀部参与发力，脚底保持稳定。",avoid:"不要强迫右脚尖完全朝前、膝盖拧向内侧或勉强追求极深蹲幅。"},
hip:{name:"侧卧髋外展",en:"Side-lying Hip Abduction",focus:"臀中肌 · 骨盆控制",tag:"稳定",reps:"12–15 次 / 侧",perSide:true,rest:45,minutes:5,weight:"徒手（不夹哑铃）",brief:"训练髋部侧面力量，但不能据此诊断右脚外八原因。",steps:["侧卧，下面的腿可以微屈以稳定身体，上面的腿伸直。","保持骨盆基本叠在一起，轻轻抬高上方腿约 20–30 厘米。","停顿片刻，再缓慢下降；翻身训练另一侧。"],feel:"上侧臀部外侧发力，腰部不必用力顶。",avoid:"不要把身体向后翻或通过脚尖大幅向上转来代偿。"},
calf:{name:"站姿双脚提踵",en:"Standing Calf Raise",focus:"小腿 · 踝关节控制",tag:"稳定",reps:"12–20 次",rest:45,minutes:4,weight:"先徒手扶墙",brief:"为脚踝控制和底鼓、踩镲踏板提供一般力量储备。",steps:["面对墙站立，手指轻扶墙帮助平衡，双脚放在舒适的角度。","缓慢抬高脚跟，让身体上升，停顿约 1 秒。","再用 2–3 秒放下脚跟，保持足部稳稳承重。"],feel:"小腿后侧发力，足踝没有明显向内外侧翻滚。",avoid:"不要借助弹跳快速完成，也不要硬把右脚摆正。"},
deadbug:{name:"简化死虫式",en:"Modified Dead Bug",focus:"腹部深层 · 核心稳定",tag:"核心",reps:"6–8 次 / 侧",perSide:true,rest:45,minutes:5,weight:"徒手",brief:"在不扭转躯干的情况下，练习四肢和核心协同。",steps:["仰卧屈膝，双腿轮流抬至髋膝约 90°；手臂朝天花板伸直。","缓慢放下一侧脚跟轻点地面，另一侧腿保持稳定。","收回原位，再换另一侧；全程自然呼吸。"],feel:"腹部稳定用力，腰部不需要拼命压平或拱起。",avoid:"不要屏住呼吸、靠腰部扭转完成动作。"}
};
// Small original vector demonstrations. These are directional schematics, not a clinical motion-capture reference.
const SKIN="#e9ad88",SHIRT="#275148",PANTS="#4f7168",DARK="#1f4239",LIME="#add46b";
function poly(points,color,width){return '<polyline points="'+points+'" stroke="'+color+'" stroke-width="'+width+'" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';}
function limb(a,b,c,color,width){return poly(a+' '+b+' '+c,color,width);}
function circle(x,y,r,fill){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'"/>';}
function bell(x,y,a){return '<g transform="translate('+x+' '+y+') rotate('+(a||0)+')"><rect x="-4" y="-13" width="8" height="26" rx="3" fill="'+DARK+'"/><rect x="-10" y="-13" width="20" height="5" rx="2" fill="'+DARK+'"/><rect x="-10" y="8" width="20" height="5" rx="2" fill="'+DARK+'"/></g>';}
function arrow(x,y){return '<path d="M'+x+' '+y+' q18 -19 26 -36 m-9 4 9-4 0 10" stroke="'+LIME+'" stroke-width="3" fill="none" stroke-linecap="round"/>';}
function stand(mode,end){
 let up=mode==="calf"&&end?10:0,squat=mode==="squat"&&end;
 let headY=43-up,sy=76-up,hy=(squat?143:136)-up,ky=(squat?185:183)-up,ay=210-up;
 let out='<g>'+circle(140,headY,17,SKIN)+'<path d="M119 '+sy+' Q140 '+(sy-12)+' 161 '+sy+'L167 '+hy+'Q140 '+(hy+13)+' 113 '+hy+'Z" fill="'+SHIRT+'"/>';
 if(squat){out+=poly('126 '+hy+' 98 '+(ky-2)+' 95 210',PANTS,20)+poly('154 '+hy+' 184 '+(ky-2)+' 188 210',PANTS,20);}
 else{out+=poly('126 '+hy+' 124 '+ky+' 120 '+ay,PANTS,19)+poly('154 '+hy+' 156 '+ky+' 160 '+ay,PANTS,19);}
 out+=poly((squat?'82 212 111 212':'107 '+(222-up)+' 135 '+(222-up)),DARK,9)+poly((squat?'171 212 199 212':'145 '+(222-up)+' 173 '+(222-up)),DARK,9);
 if(mode==="lateral"){if(end){out+=poly('117 '+sy+' 88 '+(sy+1)+' 49 '+(sy+3),SKIN,13)+poly('163 '+sy+' 192 '+(sy+1)+' 231 '+(sy+3),SKIN,13)+bell(45,sy+3,90)+bell(235,sy+3,90);}
 else{out+=poly('117 '+sy+' 103 123 99 156',SKIN,13)+poly('163 '+sy+' 177 123 181 156',SKIN,13)+bell(99,163)+bell(181,163);}}
 else if(mode==="curl"){out+=poly('116 '+sy+' 103 122 '+(end?'122 91':'97 161'),SKIN,13)+poly('164 '+sy+' 177 122 '+(end?'158 91':'183 161'),SKIN,13)+bell(end?122:97,end?86:162)+bell(end?158:183,end?86:162);}
 else if(mode==="squat"){out+=poly('116 '+sy+' 116 '+(sy+32)+' 131 '+(sy+34),SKIN,12)+poly('164 '+sy+' 164 '+(sy+32)+' 149 '+(sy+34),SKIN,12)+bell(140,sy+30,90);}
 else if(mode==="calf"){out+=poly('117 '+sy+' 105 127 '+(end?'103 159':'101 161'),SKIN,12)+poly('163 '+sy+' 175 127 '+(end?'177 159':'179 161'),SKIN,12);}
 return out+'</g>';
}
function sideStand(mode,end){
 if(mode==="wall"){
  let wrist=end?'216 48':'211 113',elbow=end?'191 89':'185 142';
  return '<path d="M231 14V224" stroke="#adbeaf" stroke-width="4" stroke-dasharray="4 7"/>'+circle(127,46,17,SKIN)+'<path d="M111 82Q126 72 144 86L153 139H111Z" fill="'+SHIRT+'"/>'+poly('121 138 121 185 119 212',PANTS,20)+poly('145 138 161 182 159 211',PANTS,20)+poly('109 223 129 223',DARK,9)+poly('148 223 169 223',DARK,9)+poly('142 88 '+elbow+' '+wrist,SKIN,14)+arrow(206,105);
 }
 if(mode==="row"){
  let out=circle(83,61,15,SKIN)+'<path d="M98 81L176 111L165 144L91 111Z" fill="'+SHIRT+'"/';
  out+=poly('166 135 201 171 203 211',PANTS,20)+poly('166 135 151 175 110 213',PANTS,20)+poly('98 217 122 217',DARK,10)+poly('190 217 213 217',DARK,10);
  out+=poly(end?'113 97 165 108 168 128':'113 97 121 132 127 177',SKIN,14)+bell(end?168:127,end?132:183);
  out+=poly('155 109 160 145 151 174',SKIN,13);return out;
 }
 if(mode==="rdl"){
 let head=end?[65,80]:[135,43],sh=end?[82,107]:[136,77],hips=[149,138],arms=end?'82 107 83 147 87 170':'136 77 130 119 124 155';
 let out=circle(head[0],head[1],16,SKIN);
 out+=end?'<path d="M83 101L165 123L157 149L71 127Z" fill="'+SHIRT+'"/>':'<path d="M117 76L154 76L162 141L124 141Z" fill="'+SHIRT+'"/>';
 out+=poly('153 138 158 184 154 211',PANTS,22)+poly('150 138 132 184 135 211',PANTS,22)+poly('120 220 148 220',DARK,9)+poly('142 220 169 220',DARK,9);
 out+=poly(arms,SKIN,13)+bell(end?87:124,end?177:162);
 out+=poly(end?'94 116 99 154 101 173':'153 80 158 120 164 154',SKIN,12)+bell(end?101:164,end?180:162);return out;
 }
 return '';
}
function floorArt(mode,end){
 let out='<path d="M18 205H266" stroke="#b4c6b6" stroke-width="4" stroke-linecap="round"/>';
 out+=circle(56,174,15,SKIN)+'<path d="M75 167L187 167L194 194L75 194Z" fill="'+SHIRT+'"/>';
 out+=poly('186 182 224 150 245 193',PANTS,18)+poly('185 188 225 181 255 195',PANTS,16);
 if(mode==="serratus"){out+=poly(end?'116 174 119 123 121 52':'116 174 118 130 120 79',SKIN,13)+circle(120,end?51:78,6,SKIN);}
 if(mode==="floorpress"){out+=poly(end?'118 173 128 110 128 60':'118 173 112 183 123 133',SKIN,14)+poly(end?'155 172 164 114 165 62':'155 172 168 181 165 135',SKIN,14)+bell(end?128:123,end?51:127,90)+bell(end?165:165,end?52:129,90);}
 if(mode==="triceps"){out+=poly(end?'120 170 137 105 140 55':'120 170 137 105 95 131',SKIN,14)+poly(end?'152 170 174 102 177 57':'152 170 174 102 139 126',SKIN,14)+bell(end?140:95,end?52:134,90)+bell(end?177:139,end?55:129,90);}
 if(mode==="deadbug"){out= '<path d="M18 205H268" stroke="#b4c6b6" stroke-width="4" stroke-linecap="round"/>'+circle(56,180,14,SKIN)+'<path d="M75 170L176 170L184 195L75 195Z" fill="'+SHIRT+'"/>'+poly('116 174 113 120 110 75',SKIN,13)+poly('141 170 144 117 145 79',SKIN,13)+poly('179 185 205 127 244 124',PANTS,19)+poly(end?'179 185 216 159 251 198':'179 185 202 140 225 122',PANTS,18);}
 return out;
}
function sideLie(mode,end){
 let out='<path d="M19 207H266" stroke="#b4c6b6" stroke-width="4"/>'+circle(55,173,15,SKIN)+'<path d="M73 169L176 171L188 194L75 194Z" fill="'+SHIRT+'"/>'+poly('177 184 221 188 254 196',PANTS,17);
 if(mode==="external"){out+=poly('120 176 152 161 '+(end?'151 97':'211 160'),SKIN,14)+bell(end?151:215,end?90:157,90);}
 else if(mode==="hip"){out+=poly(end?'181 179 217 149 256 131':'181 179 219 179 254 181',PANTS,18)+poly('185 188 223 198 254 199',PANTS,17);}
 return out;
}
function figure(exercise,end){
 let artwork="";
 if(["lateral","curl","squat","calf"].includes(exercise))artwork=stand(exercise,end);
 else if(["row","rdl","wall"].includes(exercise))artwork=sideStand(exercise,end);
 else if(["serratus","floorpress","triceps","deadbug"].includes(exercise))artwork=floorArt(exercise,end);
 else artwork=sideLie(exercise,end);
 return '<svg viewBox="0 0 280 230" role="img" aria-label="'+(end?'动作结束示意':'动作起始示意')+'" xmlns="http://www.w3.org/2000/svg"><circle cx="142" cy="105" r="95" fill="#e0e9df" opacity=".73"/><path d="M23 219H257" stroke="#cedccf" stroke-width="1.2"/>'+artwork+(end?'<path d="M223 45q18 9 11 30" stroke="'+LIME+'" fill="none" stroke-width="3" stroke-linecap="round"/><path d="M228 66l6 9 7-8" fill="none" stroke="'+LIME+'" stroke-width="3" stroke-linejoin="round"/>':'')+'</svg>';
}
const root=document.getElementById("workout-content"),dayTabs=document.getElementById("day-tabs"),phaseSelect=document.getElementById("phase-select");
let offset=0,selected=(new Date().getDay()+6)%7,opened=new Set(["serratus"]),timerId=null,timerEnds=0,timerRemaining=0,timerPaused=false,toastTimeout=null;
function readStorage(key,def){try{const s=localStorage.getItem(KEY+":"+key);return s?JSON.parse(s):def;}catch(e){return def;}}
function writeStorage(key,val){try{localStorage.setItem(KEY+":"+key,JSON.stringify(val));}catch(e){notify("浏览器储存不可用，记录可能不会保留。");}}
function dayDate(day){const now=new Date(),diff=(now.getDay()+6)%7;const mon=new Date(now.getFullYear(),now.getMonth(),now.getDate()-diff+offset*7);mon.setDate(mon.getDate()+day);return mon;}
function iso(date){return [date.getFullYear(),String(date.getMonth()+1).padStart(2,"0"),String(date.getDate()).padStart(2,"0")].join("-");}
function dateLabel(d){return (d.getMonth()+1)+"月"+d.getDate()+"日";}
function progressData(){return readStorage("log:"+iso(dayDate(selected)),{sets:{},finished:false});}
function setCount(ex){return phaseSelect.value==="starter"?1:2;}
function exerciseIDs(day){if(PLAN[day].type==="A")return [...WARM,...A];if(PLAN[day].type==="B")return [...WARM,...B];if(PLAN[day].type==="light")return WARM;return [];}
function progress(day){const log=readStorage("log:"+iso(dayDate(day)),{sets:{},finished:false});let done=0,total=0;exerciseIDs(day).forEach(id=>{const count=setCount(E[id]);total+=count;for(let i=0;i<count;i++){if((log.sets[id]||[]).includes(i))done++;}});return {done,total,pct:total?Math.round(done/total*100):0,finished:!!log.finished};}
function notify(message){const el=document.getElementById("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.classList.remove("show"),2700);}
function renderTabs(){
 const start=dayDate(0),end=dayDate(6);document.getElementById("week-range").textContent=dateLabel(start)+" — "+dateLabel(end)+" · "+start.getFullYear()+"年";
 dayTabs.innerHTML=weekdays.map((day,i)=>{let p=PLAN[i],s=progress(i),active=i===selected,done=s.total?s.pct===100:s.finished;return '<button type="button" role="tab" id="daytab-'+i+'" aria-controls="workout" aria-selected="'+active+'" class="day-tab" data-day="'+i+'"><span class="day-name">'+day+'</span><span class="day-date">'+dayDate(i).getDate()+'</span><span class="day-type '+((p.type==="rest"||p.type==="walk")?'rest':'')+'">'+(p.type==="A"?'A · 上肢':p.type==="B"?'B · 下肢':p.tag)+'</span><span class="day-indicator '+(done?'completed':'')+'"></span></button>';}).join("");
}
function card(id,log){
 const ex=E[id],count=setCount(ex),checks=log.sets[id]||[],isDone=Array.from({length:count},(_,i)=>i).every(i=>checks.includes(i));
 const sets=Array.from({length:count},(_,i)=>'<button type="button" class="set-button '+(checks.includes(i)?'done':'')+'" data-set="'+id+'" data-index="'+i+'" aria-label="'+ex.name+'第'+(i+1)+'组'+(checks.includes(i)?'，已完成':'，未完成')+'" aria-pressed="'+checks.includes(i)+'">'+(checks.includes(i)?"✓":i+1)+'</button>').join("");
 const open=opened.has(id),savedWeights=readStorage("weights",{}),weight=String(savedWeights[id]??"").replace(/[^0-9.]/g,"").slice(0,5);
 return '<article class="exercise-card '+(isDone?'is-complete':'')+'" id="exercise-'+id+'">'+
 '<div class="exercise-summary"><div class="exercise-visual"><span class="art-label">MOVEMENT / '+(open?'START & END':'DEMO')+'</span>'+figure(id,true)+'</div>'+
 '<div class="exercise-main"><div class="exercise-header"><div><div class="exercise-focus">'+ex.focus+'</div><h4 class="exercise-name">'+ex.name+'</h4><p class="exercise-en">'+ex.en+'</p></div><span class="exercise-tag">'+ex.tag+'</span></div>'+
 '<div class="exercise-details"><span><strong>'+count+' 组</strong></span><span><strong>'+ex.reps+'</strong></span><span>休息 '+ex.rest+'s</span><span>约 '+ex.minutes+' min</span></div>'+
 '<p class="exercise-one-liner">'+ex.brief+'</p>'+
 '<div class="exercise-actions"><div class="set-pills"><span class="sets-caption">完成组数</span>'+sets+'</div><div class="exercise-cta"><button class="rest-button" type="button" data-rest="'+ex.rest+'">⏱ 计时</button><button class="ghost-button" type="button" data-expand="'+id+'" aria-expanded="'+open+'">'+(open?'收起教程 ↑':'图解步骤 ↓')+'</button></div></div></div></div>'+
 (open?'<div class="exercise-expanded"><p class="figure-heading">动作图解 · 起始 → 结束</p><div class="dual-figures"><div class="figure-panel"><span class="figure-tag">01 / 起始位置</span>'+figure(id,false)+'</div><div class="figure-panel"><span class="figure-tag">02 / 动作完成</span>'+figure(id,true)+'</div></div><div class="instruction-grid"><div><h4>一步一步跟着做</h4><ol class="steps">'+ex.steps.map(s=>'<li>'+s+'</li>').join('')+'</ol><div class="weight-entry"><label for="weight-'+id+'">记录本次哑铃重量</label><input type="number" min="0" max="200" step="0.5" id="weight-'+id+'" data-weight="'+id+'" value="'+weight+'" placeholder="选填"><span>kg / 每只</span></div></div><aside class="instruction-note"><h4>应该感受到</h4><p>'+ex.feel+'</p><h4 class="warn-title">注意避免</h4><p>'+ex.avoid+'</p><h4>起始负重</h4><p>'+ex.weight+'</p></aside></div></div>':'')+'</article>';
}
function section(title,ids,note,log,index){return '<div class="group-heading"><span class="group-index">'+index+'</span><h3>'+title+'</h3><p>'+note+'</p></div><div class="exercises">'+ids.map(id=>card(id,log)).join("")+'</div>';}
function renderWorkout(){
 const p=PLAN[selected],log=progressData(),status=progress(selected),date=dayDate(selected);
 document.getElementById("session-kicker").textContent=weekdays[selected].toUpperCase()+" / "+dateLabel(date)+" · "+p.tag;
 document.getElementById("session-title").textContent=p.name;
 document.getElementById("session-desc").textContent=p.description;
 document.getElementById("session-meta").innerHTML='<span class="meta-chip">◷ '+p.duration+'</span><span class="meta-chip">'+(p.type==="A"||p.type==="B"?"哑铃 · 地板 · 墙":p.type==="light"?"不需要哑铃":"轻量活动")+'</span>'+(status.total?'<span class="meta-chip">'+status.done+' / '+status.total+' 组</span>':'');
 document.getElementById("session-note").textContent=p.note;
 document.getElementById("progress-value").textContent=status.pct+"%";
 document.getElementById("progress-disc").style.setProperty("--pct",status.pct+"%");
 document.getElementById("progress-disc").setAttribute("aria-label","训练进度 "+status.pct+"%");
 const finish=document.getElementById("finish-panel"),btn=document.getElementById("finish-btn");
 finish.hidden=!(status.total && status.done===status.total);
 btn.textContent=log.finished?"已保存完成记录 ✓":"标记今天已完成 ✓";
 btn.disabled=!!log.finished;
 if(p.type==="A"){root.innerHTML=section("先唤醒肩胛控制",WARM,"约 5–7 分钟 · 轻负荷",log,"01")+section("肩臂与上背训练",A,"慢动作 · 稳定优先",log,"02");}
 else if(p.type==="B"){root.innerHTML=section("先唤醒肩胛控制",WARM,"约 5–7 分钟 · 轻负荷",log,"01")+section("臀腿与核心训练",B,"脚尖保持舒适角度",log,"02");}
 else if(p.type==="light"){root.innerHTML=section("今日两项小练习",WARM,"做到轻松、不疲劳即可",log,"01");}
 else{root.innerHTML='<div class="rest-day"><div class="rest-icon">'+(p.type==="walk"?"↗":"☼")+'</div><h3>'+(p.type==="walk"?"今天不安排力量训练":"今天好好休息")+'</h3><p>'+p.description+'</p><div class="rest-mini"><strong>今天可以做什么</strong>'+(p.type==="walk"?"以舒服的速度散步，注意自然脚步；不刻意把右脚脚尖朝内扭，也不要求走成一条直线。":"照常生活、喝水、睡眠充足。不要求补练，也不需要强行维持挺胸夹肩的姿势。")+'</div></div>';}
 renderTabs();
}
function chooseDay(day){selected=day;opened=new Set(["serratus"]);renderWorkout();}
function toggleSet(id,index){
 const log=progressData();log.sets=log.sets||{};const sets=new Set(log.sets[id]||[]);
 if(sets.has(index))sets.delete(index);else sets.add(index);
 log.sets[id]=[...sets].sort();log.finished=false;writeStorage("log:"+iso(dayDate(selected)),log);
 renderWorkout();
 if(sets.has(index))notify("第 "+(index+1)+" 组已记录 · 可以休息 "+E[id].rest+" 秒");else notify("已取消该组完成记录");
}
function timerStart(seconds){clearInterval(timerId);timerPaused=false;timerRemaining=seconds;timerEnds=Date.now()+seconds*1000;document.getElementById("timer-widget").hidden=false;timerId=setInterval(timerTick,250);timerTick();}
function timerTick(){if(!timerPaused)timerRemaining=Math.max(0,Math.ceil((timerEnds-Date.now())/1000));const mm=String(Math.floor(timerRemaining/60)).padStart(2,"0"),ss=String(timerRemaining%60).padStart(2,"0");document.getElementById("timer-display").textContent=mm+":"+ss;document.getElementById("timer-toggle").textContent=timerPaused?"▶":"Ⅱ";document.getElementById("timer-toggle").setAttribute("aria-label",timerPaused?"继续计时":"暂停计时");if(timerRemaining===0){clearInterval(timerId);timerId=null;notify("休息结束，可以开始下一组");}}
dayTabs.addEventListener("click",e=>{const btn=e.target.closest("[data-day]");if(btn)chooseDay(Number(btn.dataset.day));});
root.addEventListener("click",e=>{
 const set=e.target.closest("[data-set]");if(set){toggleSet(set.dataset.set,Number(set.dataset.index));return;}
 const expand=e.target.closest("[data-expand]");if(expand){const id=expand.dataset.expand;if(opened.has(id))opened.delete(id);else opened.add(id);renderWorkout();return;}
 const rest=e.target.closest("[data-rest]");if(rest){timerStart(Number(rest.dataset.rest));return;}
});
root.addEventListener("change",e=>{const item=e.target.closest("[data-weight]");if(!item)return;const value=Number(item.value),weights=readStorage("weights",{});if(item.value!==""&&Number.isFinite(value)&&value>=0&&value<=200){weights[item.dataset.weight]=value;writeStorage("weights",weights);notify("哑铃重量已保存");}else if(item.value===""){delete weights[item.dataset.weight];writeStorage("weights",weights);}else{notify("请输入 0–200 kg 的数字");item.value="";}});
document.getElementById("prev-week").addEventListener("click",()=>{offset--;renderWorkout();});
document.getElementById("next-week").addEventListener("click",()=>{offset++;renderWorkout();});
document.getElementById("this-week").addEventListener("click",()=>{offset=0;selected=(new Date().getDay()+6)%7;renderWorkout();});
phaseSelect.addEventListener("change",()=>{writeStorage("phase",phaseSelect.value);renderWorkout();notify(phaseSelect.value==="starter"?"已切换到适应期 · 每项 1 组":"已切换到标准期 · 每项 2 组");});
document.getElementById("finish-btn").addEventListener("click",()=>{const log=progressData();log.finished=true;writeStorage("log:"+iso(dayDate(selected)),log);renderWorkout();notify("已保存今日完成记录！");});
document.getElementById("timer-toggle").addEventListener("click",()=>{if(timerRemaining===0){timerStart(60);return;}timerPaused=!timerPaused;if(!timerPaused)timerEnds=Date.now()+timerRemaining*1000;timerTick();});
document.getElementById("timer-close").addEventListener("click",()=>{document.getElementById("timer-widget").hidden=true;clearInterval(timerId);timerId=null;});
const dialog=document.getElementById("help-dialog");
document.getElementById("help-btn").addEventListener("click",()=>dialog.showModal?dialog.showModal():dialog.setAttribute("open",""));
document.getElementById("help-close").addEventListener("click",()=>dialog.close?dialog.close():dialog.removeAttribute("open"));
dialog.addEventListener("click",e=>{if(e.target===dialog&&dialog.close)dialog.close();});
phaseSelect.value=readStorage("phase","starter")==="regular"?"regular":"starter";
renderWorkout();
})();