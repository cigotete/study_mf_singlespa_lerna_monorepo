#!/usr/bin/env node
const prompts = require('prompts');
prompts.override(require('yargs').argv);
const {spawn} = require('node:child_process')

const apps = {
  clients:9001,
  invoices:9002,
  menu:9003,
  products:9004
};

(async () => {

  const {appSelected} = await prompts([
    
    {
      type: 'multiselect',
      name: 'appSelected',
      message: 'Select the applications you want to start:',
      instructions:false,
      choices: Object.entries(apps).map(([appName, portNumber])=>({
        title:`${appName} (Port: ${portNumber})`,
        value: appName
      }))
      ,
      hint: '- Select the applications you want to start (using the space bar and press enter) -',
    }
  ]);


  if(Array.isArray(appSelected) && appSelected.length<=0){
    console.log("You must select at least one application to start.");
    process.exit();
  }

 const iniciarProceso= spawn(/^win/.test(process.platform) ? 'lerna.cmd' :'lerna',
 [ 
 "run",
  "start",
  "--scope",
  `*/*{root-config,styleguide,${appSelected.join(",")}}*`,
  "--stream",
  "--parallel",
],
{
    stdio:"inherit",
    env: {
        ...process.env,
        FEATURE_APP_DATA: JSON.stringify(Object.fromEntries(
          appSelected.map(appName => [appName, apps[appName]])
        )),
    }
}
);
 
  
})();