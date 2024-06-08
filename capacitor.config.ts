import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.alarma_robo.app',
  appName: 'Alarma anti robo',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins:{
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#000000",
      splashFullScreen: true,
      splashImmersive: true,
    },
      // launchFadeOutDuration:3000,
      // launchAutoHide: false,
      // androidSplashResourceName: "splash",
      // androidScaleType: "CENTER_CROP",
      // layoutName: "launch_screen",
      // useDialog: true,
  }
  // plugins: {
  //   SplashScreen: {
  //     launchShowDuration: 3000,
  //     launchAutoHide: true,
  //     backgroundColor: "#ffffffff",
  //     androidSplashResourceName: "splash",
  //     androidScaleType: "CENTER_CROP",
  //     showSpinner: false,
  //     splashFullScreen: true,
  //     splashImmersive: true
  //   }
  // }
};

export default config;
