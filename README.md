## 1. Register

1. mongoose 모델 생성 및 연결

- connect URI config화?
- Modeling

2. bcrypt로 비밀번호 암호화

- DB 저장 전 암호화 : bcrypt
- 비밀번호 비교

3. 로그인 구현 - passport 라이브러리

- successRedirect, failureRedirect 경로 문제로 인한 오류...

4. client단 페이지 이동 - react-route-dom

- useHistory : history.push(url, {some state})
- useLocation :
- withRoute

5. Form

- useState의 '비동기적 성질'로 변경된 state가 바로 적용이 안된다. -> 즉, 리 렌더링 되어야 state값 변경이 적용된다. 이것을 Effect를 사용해 해결한다.

6. react-file-base64

- 64비트 이진 데이터로 이미지를 DB에 저장하기 위해 사용. multer를 이용했었지만 DB에 저장하고 불러오는 것을 구현하는 것이 까다로워 선택했다.

7. Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

- https://developers.google.com/web/updates/2017/09/abortable-fetch

8. 시간차 렌더링을 위해 Suspense 컴포넌트가 리액트에서 지원되지만, 아직 실험단계라 따로 Timeout을 줘 구현했다.
9. Access to XMLHttpRequest at '서버URL 주소' from origin 'Client주소' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

-

10. 노드 서버 PayloadTooLargeError: request entity too large 에러 문제

- app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  다음과 같이 limit를 사용해 용량을 설정해주는 방식으로 해결.
  https://stackoverflow.com/questions/19917401/error-request-entity-too-large

11. CSP(Content Security Policy) 문제...favicon.ico 이미지를 사용하지 않는데 이런 오류가 떠서 방법을 찾아봄

- 서버를 heroku에 배포한 후, 이런 문제가 발생함..
- Helmet 패키지를 이용해 보안 설정해준다.(되지 않음)
- var favicon = require('serve-favicon');
  var path = require('path');
  app.use(favicon(path.join(\_\_\_dirname, 'public', 'favicon.ico')));
  이렇게 하니 경로가 '/app/public/favicon.ico'로 나타나면 파일이 없다고 한다.

- app.get('/favicon.ico', (req, res) => res.sendStatus(204));
  이렇게 204메세지로 전달하도록 했는데, 처음 상태 에러로 돌아감..하..

12. 몽구스 IP 연결 에러 - IP를 0.0.0.0/0 으로 설정해 어디서든 접근 가능토록 함
