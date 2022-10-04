## MLB-stats frontend by Next.js

https://mlb-stats-frontend.vercel.app/


### 전체 어플리케이션 구조도

![diagram](https://user-images.githubusercontent.com/34852597/193076517-141717da-5656-41f7-adf1-b54768ecab72.png)

### 기능
- Elastic search 의 fuzzy api 를 이용한 선수 검색 기능 (완벽히 맞지 않아도 유사도 순으로 검색결과 제공)
- 각 선수의 종합점수, 시즌별 기록(타격) 요약 제공 페이지 
![image](https://user-images.githubusercontent.com/34852597/193804601-7d644d00-7395-434f-9cd1-ca4bc81e723d.png)

- 각 선수의 자세한 기록(타격) 페이지
![image](https://user-images.githubusercontent.com/34852597/193813415-bb090221-6078-4ea0-aece-4bb4e3f1a70a.png)

- 선수 비교 페이지 (종합점수, 통산기록) 
![image](https://user-images.githubusercontent.com/34852597/193813647-c8cbe3f1-3415-4445-9cd5-ef4ab23a9a6c.png)

### Description 
- Next.js를 활용한 정적 페이지 생성 (index, search, detail, compare)
- 각 페이지 별 반응형 레이아웃 구현
- React-query를 활용한 server 상태 관리
- 시각화 라이브러리 중 하나인 Visx를 사용하여 각종 데이터 시각화
![search](https://user-images.githubusercontent.com/34852597/193078623-cb2ecf8d-28bf-4647-99b4-6aae3c17fc45.PNG)

### Stack
- Typescript
- Next.js
- Tailwind CSS
- React-query
- Visx
