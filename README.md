# Java (Server)

* ⚡ ️Version
```
* Spring_Boot 3.2.1
* Maria_db 8.xx (RDBMS)
* Mybatis (Frame_Work)
* LomBok
* JAVA 17
```

# React (Web)

*⚡️  React App 생성
```
cd src/main
npx create-react-app {프로젝트명}
```

*⚡️ React 실행
```
cd fronted
npx start
```

*⚡️ Proxy 설정
```
npm install http-proxy-middleware --save
```
*⚡️ Proxy 경로
```
//경로
src/main/fronted/src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',	// 서버 URL or localhost:설정한포트번호
      changeOrigin: true,
    })
  );
};
```

*⚡️ 통신 테스트 및 App.js
```
// Axios 설치
npm install axios --save
```

```
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [hello, setHello] = useState('');

    useEffect(() => {
        axios.get('/api/test')
            .then((res) => {
                setHello(res.data);
            })
    }, []);
    return (
        <div className="App">
            백엔드 데이터 : {hello}
        </div>
    );
}

export default App;
```


*⚡️ 빌드


```agsl
def frontendDir = "$projectDir/src/main/frontend"

sourceSets {
	main {
		resources { srcDirs = ["$projectDir/src/main/resources"]
		}
	}
}

processResources { dependsOn "copyReactBuildFiles" }

task installReact(type: Exec) {
	workingDir "$frontendDir"
	inputs.dir "$frontendDir"
	group = BasePlugin.BUILD_GROUP
	if (System.getProperty('os.name').toLowerCase(Locale.ROOT).contains('windows')) {
		commandLine "npm.cmd", "audit", "fix"
		commandLine 'npm.cmd', 'install' }
	else {
		commandLine "npm", "audit", "fix" commandLine 'npm', 'install'
	}
}

task buildReact(type: Exec) {
	dependsOn "installReact"
	workingDir "$frontendDir"
	inputs.dir "$frontendDir"
	group = BasePlugin.BUILD_GROUP
	if (System.getProperty('os.name').toLowerCase(Locale.ROOT).contains('windows')) {
		commandLine "npm.cmd", "run-script", "build"
	} else {
		commandLine "npm", "run-script", "build"
	}
}

task copyReactBuildFiles(type: Copy) {
	dependsOn "buildReact"
	from "$frontendDir/build"
	into "$projectDir/src/main/resources/static"
}
```

```agsl
./gradlew build
```