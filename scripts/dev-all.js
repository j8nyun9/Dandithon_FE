import {spawn} from 'node:child_process';
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve,basename} from 'node:path';
const frontend=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const defaultBackend=basename(frontend)==='Dandithon_FE-main'?'Dandithon_BE-main':'upload-BE';
const backend=resolve(process.env.DANDI_BE_DIR||resolve(frontend,'..',defaultBackend));
const server=resolve(backend,'src/server.js'),vite=resolve(frontend,'node_modules/vite/bin/vite.js');
if(!existsSync(server)){console.error(`백엔드 폴더를 찾지 못했습니다: ${backend}\nDANDI_BE_DIR 환경변수로 백엔드 경로를 지정해 주세요.`);process.exit(1);}
if(!existsSync(vite)){console.error('프론트엔드 의존성이 없습니다. npm.cmd install을 먼저 실행해 주세요.');process.exit(1);}
console.log('프론트엔드와 백엔드를 함께 실행합니다. 종료하려면 Ctrl+C를 누르세요.');
const children=[];let stopping=false;
function stop(code=0){if(stopping)return;stopping=true;for(const child of children)if(child.exitCode===null&&!child.killed)child.kill();process.exitCode=code;}
function start(label,args,cwd){const child=spawn(process.execPath,args,{cwd,stdio:'inherit',env:process.env,windowsHide:true});children.push(child);child.on('error',()=>{console.error(`${label} 실행에 실패했습니다.`);stop(1);});child.on('exit',(code,signal)=>{if(!stopping){console.error(`${label} 서버가 종료되어 함께 종료합니다.`);stop(code||(signal?1:0));}});}
process.on('SIGINT',()=>stop());process.on('SIGTERM',()=>stop());
start('백엔드',[server],backend);
start('프론트엔드',[vite,'--host','127.0.0.1','--strictPort',...(process.env.DANDI_FE_PORT?['--port',process.env.DANDI_FE_PORT]:[])],frontend);
