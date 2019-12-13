//Config File
//Can add CDNs [Online script] before local copy of libraries 
requirejs.config({
    baseUrl:'js',
    paths:{
        redis: '',
        angular:'angular.min',
        extCore:'ext-core',
        jquery:'jquiery.min',
        mootools:'mootools.min',
        swfObj:'swfobject'
    }
});