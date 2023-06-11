<p align="center"><img  src="https://user-images.githubusercontent.com/60888056/104448875-139d2380-55e1-11eb-8429-1c73ff246cac.png"/></p>

# Cardgram Web

리액트 공부를 하기 위해 만든 sns처럼 게시물을 만들고, 공유하는 웹 프로젝트입니다. Client는 React를 사용, Server는 Node.js Express를 이용해 구축했습니다.

---

## 목차

- [project](#project-내용)
- [프로젝트 구성](#프로젝트-구성)
- [문제점 해결](#문제점-해결)
- [배운 점](#배운-점)
- [느낀 점](#느낀-점)

---

## Project 내용

#### 개요
###### 개인 프로젝트 (2020.12.22~2021.01.10)
리액트 공부를 시작하면서 계획한 웹 프로젝트로, 인스타그램 sns 기능을 스스로 구현해보고 싶어 이 프로젝트를 수행했습니다. Client와 Server 간의 데이터 통신방법, 그 과정에서의 보안적 이슈 문제, Production과 Local 환경에서 개발의 차이점 등 정말 많은 것을 배우고 알게 된 프로젝트입니다.

- Front

1. React로 client단 로직 구현
2. React-router를 활용한 SPA 웹을 구현
3. Material-ui를 사용해 스타일링
4. Netlify 플랫폼을 이용해 Client 배포

- Back

1. Node.js Express를 이용한 서버 구축
2. Mongo DB mongoose를 이용해 데이터베이스 사용
3. Passport js를 이용한 로그인, 회원가입, 인증 구현
4. Heroku 플랫폼으로 Server 배포

---

## 프로젝트 구성

#### Client

- 폴더구조

```bash
├─api
│
├─components
│  ├─DetailUserPage
│  ├─FormPage
│  ├─LandingPage
│  ├─LoginPage
│  ├─Navigation
│  ├─Posts
│  │  ├─PostCard
│  ├─RegisterPage        
├─hoc

```
각 컴포넌트, API, 그리고 기타 여러 파일들로 폴더 구조를 정리해 클라이언트 코드 가독성을 높이고 유지보수 용이하도록 만들었습니다.


- React-router

```JAVASCRIPT
 <div className="App">
     <BrowserRouter>
       <Switch>
         <Route exact path='/' component={LandingPage} />
         <PrivateRoute path='/form' component={FormPage} />
         <Route path='/login' component={LoginPage} />
         <Route path='/register' component={RegisterPage} />
         <PrivateRoute path='/detail' component={DetailUserPage} />
         <Route path='/Postdetail/:postId' component={DeatilPostPage} />
       </Switch>
     </BrowserRouter>
   </div>

```

라우터를 이용해 SPA형태의 웹을 구성하고자 했습니다. PrivateRoute를 만들어 사용자 인증 여부에 따라 접근 권한 페이지를 다르게 설정하도록 만들었습니다. 인증이 되지 않은 유저가 접근하면 로그인을 하도록 유도하고, 인증이 된 유저는 허용하도록 구현했습니다.

```JAVASCRIPT

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = window.localStorage.getItem('isAuthenticated');
  return (
    <Route {...rest} render={(props) => isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )}
    />
  );
}

```

- Axios

```JAVASCRIPT

export const usesrLogin = async (loginData) => {
  try {
    return await axios({
      method: "POST",
      data: loginData,
      withCredentials: true,
      url: `${USER_SERVER}/login`,
    });
  } catch (error) {
    console.log(error);
  }
}

```

처음 개발 단계에서는 위의 코드처럼 axios 옵션 값들 명시적으로 작성하지 않고, 일반적으로 사용하는 방법인 axios(url, [options]) 형태로 서버에 요청했습니다.
이 과정에서 Express와 Passport 단에서 Access-Control-Allow-Credentials 문제가 발생해 해결책으로 위의 코드처럼 명시적으로 credential 옵션을 true로 설정해줘 문제를 해결했습니다.

- base64
64비트 이진 데이터로 이미지를 DB에 저장하기 위해 사용하는 라이브러리. multer를 이용했었지만 DB에 저장하고 불러오는 것을 구현하는 것이 까다로워 선택했습니다.

#### Server

- 폴더구조

```bash
├─config
│  ├─dev.js
│  ├─key.js
│  ├─passport-config.js
│  ├─prod.js
├─controllers
│  ├─auth.js
│  ├─posts.js
│  ├─users.js
├─models
│  ├─PostMessage.js
│  ├─User.js
├─routes
│  ├─posts.js
│  ├─users.js
├─index.js

```

서버 영역에서 설정, 라우팅, 로직, DB모델로 폴더를 세분화해 깔끔하고 가독성을 높여 추후에 리팩토링 과정, 유지보수에 용이하도록 구성했습니다.


## 문제점 해결
###### 1. CORS 에러 문제
Access-Control-Allow-Origin 문제가 가장 많이 발생했는데 이것을 해결하고자 정말 많은 검색을 했고, npm cors 패키지를 이용해 CORS 에러를 방지했습니다. 서버와 클라이언트 간 통신을 잘 되더라도 DB에서 데이터를 못 받아오는 경우에도 종종 발생해 해결하는데 어려움을 겪었던 문제입니다.

###### 2. 리액트 'Can't perform a React state update on an unmounted component.' 에러
이 문제는 주로 useEffect 훅 내부에서 API를 호출해 데이터를 받아 내는 로직에서 많이 발생했습니다. 다음과 같이 clena up 함수를 활용해 정리를 해줘 문제를 해결했습니다.

```JAVASCRIPT

useEffect(() => {
    let mounted = true;
    api.getUserPosts(userName).then((res) => {
      if (mounted) {
        setMyPosts(res.data);
      }
    });

    return function cleanup() {
      mounted = false;
    }
  }, []);
  
```  

###### 3. 서버 PayloadTooLargeError: request entity too large 에러
다음과 같이 limit를 사용해 용량을 설정해주는 방식으로 해결.

```JAVASCRIPT
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
```  
참조: https://stackoverflow.com/questions/19917401/error-request-entity-too-large


###### 4. CSP(Content Security Policy)
Heroku에 서버 배포 과정에서 favicon 관련 CSP 문제가 계속 발생했습니다. 
문제를 해결하고자
- Helmet 패키지 사용해 보안 설정(but, 해결되지 않음)
- app.get('/favicon.ico', (req, res) => res.status(204).end())
서버에 위와 같이 설정해 강제로 204상태를 보내도록 했고, 클라이언트 주소로 origin을 설정하니 문제가 해결됐습니다. 이 문제 해결을 통해 새로운 보안 문제에 대해 알게 됐습니다.


## 배운 점

- 보안적인 문제에 대해 많은 고민을 해야한다는 것을 알게 됐습니다.
- 배포를 직접 해보면서 로컬 환경에서 개발하는 것과는 또 다른 많은 변수들을 생각해야 한다는 것을 알게 됐습니다.
- 웹 속도가 느린 것을 해결하기에는 아직 공부가 부족합니다. 그래서 데이터베이스와 서버 최적화에 대해 공부해 다음 프로젝트에 활요할 것입니다.

## 느낀 점
 처음으로 서버와 클라이언트 단을 연동해 배포까지 해보면서 정말 다양한 공부를 하게 됐고, 또 많은 것을 알게 된 프로젝트입니다. 프로젝트를 통해 서버, 데이터베이스, 네트워크 보안 쪽에 많은 공부를 해야한다고 느꼈습니다. 비록 많이 부족하고 미숙하지만 개발 공부를 하면서 굉장히 재밌었고, 처음 공부를 시작했을 때를 생각하면 지금은 정말 생각지도 못한 성장을 이뤄낸 제 모습이 정말 뿌듯합니다. 앞으로 더 많은 개발 공부를 통해 더 성장한 개발자로 나아가는 것이 목표입니다.

