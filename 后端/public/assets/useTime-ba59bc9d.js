const l=()=>{const t=new Date;let e=t.getHours(),n=t.getMinutes(),o=t.getSeconds();return e=e.toString().padStart(2,"0"),n=n.toString().padStart(2,"0"),o=o.toString().padStart(2,"0"),e+":"+n+":"+o},d=()=>new Date().toLocaleDateString("zh-CN",{year:"numeric",month:"numeric",day:"numeric"}).replace(/\//g,"-"),m=()=>d()+"  "+l(),h=(t,e,n,o,a,s)=>{const r=Date.now()-new Date(t,e-1,n,o,a,s).getTime(),c=Math.floor(r/(1e3*60*60*24)),i=Math.floor(r%(1e3*60*60*24)/(1e3*60*60)),g=Math.floor(r%(1e3*60*60)/(1e3*60)),u=Math.floor(r%(1e3*60)/1e3);return`${c}天${i}时${g}分${u}秒`};export{m as a,h as g};
