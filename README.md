## 1. Register

1. mongoose 모델 생성 및 연결

- connect URI config화?
- Modeling

2. bcrypt로 비밀번호 암호화

- DB 저장 전 암호화 : bcrypt
- 비밀번호 비교

3. 로그인 구현 - passport 라이브러리

4. client단 페이지 이동 - react-route-dom

- useHistory : history.push(url, {some state})
- useLocation :
- withRoute

5. Form

- useState의 '비동기적 성질'로 변경된 state가 바로 적용이 안된다. -> 즉, 리 렌더링 되어야 state값 변경이 적용된다. 이것을 Effect를 사용해 해결한다.

6. react-file-base64

- 64비트 이진 데이터로 이미지를 DB에 저장하기 위해 사용. multer를 이용했었지만 DB에 저장하고 불러오는 것을 구현하는 것이 까다로워 선택했다.
