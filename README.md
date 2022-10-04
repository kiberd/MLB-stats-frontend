## MLB-stats frontend by Next.js

https://mlb-stats-frontend.vercel.app/


### 전체 어플리케이션 구조도

![diagram](https://user-images.githubusercontent.com/34852597/193076517-141717da-5656-41f7-adf1-b54768ecab72.png)

---

### 기능
- **ElasticSearch fuzzy api를 이용한 선수 검색 기능 (완벽히 맞지 않아도 유사도 순으로 검색결과 제공)**
- **각 선수의 종합점수, 시즌별 기록(타격) 요약 제공 페이지** 

![image](https://user-images.githubusercontent.com/34852597/193816475-9cb6e467-c4a0-4b3c-9bfa-4ad6eedd6a1b.png)

- **각 선수의 자세한 기록(타격) 페이지**

![image](https://user-images.githubusercontent.com/34852597/193813415-bb090221-6078-4ea0-aece-4bb4e3f1a70a.png)

- **선수 비교 페이지 (종합점수, 통산기록)** 

![image](https://user-images.githubusercontent.com/34852597/193813647-c8cbe3f1-3415-4445-9cd5-ef4ab23a9a6c.png)

---

### Description 
- **Next.js를 활용한 정적 페이지 생성 (index, search, detail, compare)**
- **Tailwind CSS를 활용한 각 페이지 별 반응형 레이아웃 구현 (768px, 1024px, 1280px)**
- **React-query를 활용한 server 상태 관리 및 caching**
- **시각화 라이브러리 중 하나인 Visx를 사용하여 각종 데이터 시각화**

---

### Stack
- Typescript
- Next.js
- Tailwind CSS
- React-query
- Visx
