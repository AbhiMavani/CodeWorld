var exec  = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');
var colors = require('colors');
var cppModule = require('./cppModule.js');
var javaModule = require('./javaModule.js');
var pyModule = require('./pyModule.js');
//var csModule = require('./csModule.js');



exports.stats = false;

exports.init = function(option){
	if(option)
	{
		if(option.stats === true )
		{
			console.log('Statistics for compilex is On'.green);		
			exports.stats = true;			
		}
    }	
	fs.exists( './Data/IDE' , function(exists){		
		    if(!exists)   	
		    	fs.mkdirSync('./Data/IDE');
	});
}

exports.compileCPP = function ( envData ,  code , fn ){
	if(exports.stats)
		cppModule.stats = true;
	cppModule.compileCPP(envData , code , fn );
}

exports.compileCPPWithInput = function ( envData , code , input ,  fn ) { 
	if(exports.stats)
		cppModule.stats = true;
	cppModule.compileCPPWithInput(envData , code , input , fn );	
}


exports.compileJava = function ( envData , code , fn ){
	if(exports.stats)
		javaModule.stats = true;
	javaModule.compileJava(envData , code,fn);
}

exports.compileJavaWithInput = function ( envData , code , input ,  fn ){
	if(exports.stats)
		javaModule.stats = true;
	javaModule.compileJavaWithInput( envData , code , input ,  fn );	
}

exports.compilePython = function ( envData ,  code , fn ){
	if(exports.stats)
		pyModule.stats = true;
	pyModule.compilePython(envData , code , fn );
}

exports.compilePythonWithInput = function( envData , code , input ,  fn){
	if(exports.stats)
		pyModule.stats = true;
	pyModule.compilePythonWithInput(envData , code , input , fn );

}

exports.compileCS = function ( envData ,  code , fn ){
	if(exports.stats)
		csModule.stats = true;
	csModule.compileCS(envData , code , fn );
}

exports.compileCSWithInput = function ( envData , code , input ,  fn ) { 
	if(exports.stats)
		csModule.stats = true;
	csModule.compileCSWithInput(envData , code , input , fn );	
}


exports.flushSync = function() {
	    path = './Data/IDE';
	    fs.readdir(path, function(err , files){ 
	    	if(!err)
	    	{
	    		for( var i = 0 ; i<files.length ; i++ )
	    		{
	    			
	    			fs.unlinkSync(path+files[i]);	    			

	    		}
	    	}
	    });
}

exports.flush = function(fn) {
	    path = './Data/IDE';
	    fs.readdir(path, function(err , files){ 
	    	if(!err)
	    	{
	    		for( var i = 0 ; i<files.length ; i++ )
	    		{
	    			
	    			fs.unlinkSync(path+files[i]);	    			

	    		}
	    	}
	    });
	    fn();	    
}

exports.fullStat = function(fn){
	var uptime = process.uptime();	
	
	
	var cppCount = 0;
	var javaCount = 0 ;
	var pyCount = 0 ;
	var total = 0 ;

	var files = fs.readdirSync('temp');
	for(var file in files )
	{
		var stat = fs.statSync('temp/'+files[file]);		
		if(stat.isFile())
		{
			if(files[file].indexOf('.cpp') !== -1)
			{
				cppCount++;
			}
			if(files[file].indexOf('.py') !== -1)
			{
				pyCount++;
			}
		}
		else
		{
			javaCount++;
		}
	}

	var jsonData = { serverUptime : uptime , 
					 fileDetails : {
					 					cpp : cppCount ,
					 					java : javaCount ,
					 					python : pyCount 
					 			   }
				   }
	if(exports.stats)
	{

		var str  = "Server Statistics".yellow + "\n"
				 + "compilex Server Uptime : " + uptime  + "\n" 
				 + "Files on storage :" + "\n"
				 + "C & CPP files : " + cppCount + "\n"
				 + "Java files : " + javaCount + "\n"
				 + "Python files : "+ pyCount ;
		console.log(str);
	}
	fn(jsonData);

}
