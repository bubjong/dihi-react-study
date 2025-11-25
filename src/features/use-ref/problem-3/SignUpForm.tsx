import { useState } from "react";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showVerificationCodeField, setShowVerificationCodeField] =
    useState(false);

  return (
    <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", gap: "10px" }}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="button"
          disabled={email.length === 0}
          onClick={() => {
            setShowVerificationCodeField(true);
          }}
        >
          인증하기
        </button>
      </div>
      {showVerificationCodeField && (
        <div style={{ display: "flex", gap: "10px" }}>
          <label htmlFor="verificationCode">인증코드</label>
          <input
            id="verificationCode"
            name="verificationCode"
            type="text"
            placeholder="인증코드를 입력하세요"
          />
          <span>제한시간: 03:00</span>
        </div>
      )}
      <div style={{ display: "flex", gap: "10px" }}>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">회원가입</button>
      </div>
    </form>
  );
}
