export const identityCardCss = `.exam-preparation {
  display: flex;
  position: relative;
  margin: 10px;
}

.exam-preparation h1 {
  text-align: center;
  font-style: var(--font-style);
}

@media (min-width: 401px) {
  .exam-preparation h1 {
      text-align: left;
  }
}

.exam-preparation .img1 {
  position: absolute;
  top: 60%;
  right: 15%;
  transform: rotate(25.43deg);
}

@media (max-width: 720px) {
  .exam-preparation .img1 {
      top: 63%;
      right: 14%;
      width: 62px;
  }
}

.exam-preparation .img2 {
  position: absolute;
  top: 15%;
  right: 20%;
  transform: rotate(-17.18deg);
}

@media (max-width: 720px) {
  .exam-preparation .img2 {
      top: -7%;
      right: 0%;
  }
}

.exam-preparation .img3 {
  position: absolute;
  top: 15%;
  left: 25%;
  transform: rotate(-16.25deg);
}

@media (max-width: 720px) {
  .exam-preparation .img3 {
      top: -3%;
      left: 25%;
      width: 78px;
  }
}

.exam-preparation .img4 {
  position: absolute;
  top: 70%;
  left: 5%;
  transform: rotate(11.39deg);
}

@media (max-width: 720px) {
  .exam-preparation .img4 {
      top: 62%;
  }
}

.exam-preparation .img5 {
  position: absolute;
  top: 35%;
  right: 10%;
  transform: rotate(-165deg);
}

@media (max-width: 720px) {
  .exam-preparation .img5 {
      top: 15%;
      right: 0%;
      width: 78px;
  }
}

.exam-preparation .img6 {
  position: absolute;
  top: 85%;
  right: 15%;
}

@media (max-width: 720px) {
  .exam-preparation .img6 {
      display: none;
  }
}

.exam-preparation .img7 {
  position: absolute;
  top: 85%;
  left: 15%;
  transform: rotate(-69.35deg);
}

@media (max-width: 720px) {
  .exam-preparation .img7 {
      display: none;
  }
}

.exam-preparation .img8 {
  position: absolute;
  top: 25%;
  left: 10%;
  transform: rotate(-69.35deg);
}

@media (max-width: 720px) {
  .exam-preparation .img8 {
      top: 15%;
      left: -5%;
      width: 78px;
  }
}

.exam-preparation .exam-preparation-container {
  margin: 25px auto 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.exam-preparation .exam-preparation-container .header-img {
  width: fit-content;
}

.exam-preparation .exam-preparation-container .ep-msg {
  font-size: 16px;
  line-height: 160%;
  text-align: center;
  color: #8D979F;
  width: 650px;
}

@media (max-width: 720px) {
  .exam-preparation .exam-preparation-container .ep-msg {
      width: 98%;
  }
}

.exam-preparation .exam-preparation-container > h1 {
  font-weight: 500;
  margin-top: 5px;
  font-style: var(--font-style);
}

.exam-preparation .exam-preparation-container label {
  font-weight: 400;
  color: #92959A;
  font-style: var(--font-style);
}
`;

export const examPreprationCss = `.exam-preparation-container {
	display: flex;
	flex-direction: column;
	background-color: var(--theme-mode);;
}

.exam-preparation-wrapper {
	margin: auto;
	display: flex;
	flex-direction: column;
}

.exam-preparation-header-img {
	width: 110px;
	height: 70.71px;
	margin: 26px auto 0px;
}

.exam-preparation-header-title {
	font-family: Poppins;
	font-style: normal;
	font-weight: bold;
	font-size: 42px;
	line-height: 63px;
	display: flex;
	align-items: center;
	text-align: center;
	color: #222222;
	margin: 26px auto 0px;
	color: var(--text-color);
	font-style: var(--font-style);
}

.exam-preparation-msg {
	font-family: Poppins;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 160%;
	display: flex;
	align-items: center;
	text-align: center;
	color: #8D979F;
	width: 650px;
	margin: auto;
	font-style: var(--font-style);
}

.exam-preparation-tnc-block {
	text-align: center;
	display: flex;
	font-size: 15px;
	flex-direction: row;
	margin: 32px auto 0px;
	color: #9DAAB5;
	max-width: 650px;
}

.exam-preparation-tnc-checkbox {
	margin-right: 5px;
	cursor: pointer;
	display: flex;
	align-self: flex-start;
}

.exam-preparation-tnc-txt {
	font-family: Poppins;
	font-style: normal;
	line-height: 21px;
	display: flex;
	align-items: center;
	cursor: pointer;
	font-style: var(--font-style);
}

.exam-preparation-sd-container {
	font-family: Poppins;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 21px;
	align-items: center;
	color: #9DAAB5;
	margin: 25px auto 0px;
	font-style: var(--font-style);
}

.exam-preparation-sd-link {
	color: var(--theme-color);
	text-decoration: underline;
	cursor: pointer;
}

.exam-preparation-error-msg {
	font-family: Poppins;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 24px;
	display: flex;
	align-items: center;
	text-align: center;
	color: #E95E5E;
	max-width: 650px;
	margin: auto;
}

.exam-preparation-btn-container {
	margin: 30px auto 30px;
}

.exam-preparation-btn {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 11px 32px;
	background: var(--theme-color);
	border-radius: 5px;
	border: 0px;
	color: #ffffff;
	cursor: pointer;
}
`;

export const modalCss = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  font-style: var(--font-style);
}
:root {
  --theme-color: #FF961B;
  --font-style: var(--font-style);
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}
  
.modal-content {
  display: flex;
  flex-direction: column;
  width: 830px;
  position: fixed;
  top: 50%;
  height: 530px;
  left: 50%;
  z-index: 99999999999999999;
  transform: translate(-50%, -50%);
  background: var(--theme-mode);
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 1.1rem;
  padding: 25px;
  overflow: auto;
  padding-top: 10px;
}
@media (max-width: 1100px) {
  .modal-content {
    width: 95%; 
    height: auto; 
    max-height: 80vh; 
    font-size: 1rem; 
    padding: 15px; 
  }
}

@media (max-width: 480px) {
  .modal-content {
    width: 100%; 
    height: auto;
    max-height: 85vh;
    font-size: 0.9rem;
    padding: 10px;
    border-radius: 0; 
  }
}
.dropdown-option{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 12px;
  padding-left: 12px;
  padding-bottom: 5px;
}

.flag-icon-img{
  width: 25px;
}
.dropdown-content .text{
  font-size: 14px !important;
  font-weight: 400 !important;
  cursor: pointer;
  color: var(--text-color);
}
.close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  cursor: pointer;
  align-items: end;
  justify-content: end;
  position: absolute;
  right: 13px;
  top: 2px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.tab {
  cursor: pointer;
  padding: 10px;
  display: inline-block;
}

.tab.active {
  color: var(--theme-color);
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

.tabs-container > div{
  white-space: nowrap;
  font-size: 15px;
}

.header {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.dropdown {
  position: relative;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  margin-left: -13px;
  cursor: pointer;
}
.live-chat-container{
  position: fixed;
  bottom: 87px;
  right: 33px;
  height: 500px;
  z-index: 99999999;
}

.dropdown .select {
  display: flex;
  align-items: center;
  padding: 5px;
  column-gap: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  max-width: 182px;
  justify-content: space-between;
  z-index: 99999;
}
.dropdown .select label{
  cursor: pointer;
  font-size: 14px;
  color: var(--text-color);
}

.dropdown .select div {
  margin-right: 5px;
}

body.modal-active iframe:not(.modal iframe) {
    visibility: hidden !important;
}

body.modal-active embed:not(.modal embed),
body.modal-active object:not(.modal object),
body.modal-active applet:not(.modal applet) {
    visibility: hidden !important;
}
.dropdown-content {
  position: absolute;
  top: 42px;
  right: -70px;
  background-color: var(--theme-mode);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  display: none;
  border: 1px solid white;
}

.dropdown-content.active {
  display: block;
  z-index: 999;
}

.dropdown .option {
  padding: 8px 12px;
  cursor: pointer;
}

.dropdown .option:hover {
  background-color: #f0f0f0;
}`;

export const systemRequirementCss = `
.system-requirement-test-screen {
  display: flex;
  flex-direction: column;
}

@media (max-width: 720px) {
  .system-requirement-test-screen .prompt-image {
    width: 100%;
  }
}

.system-requirement-test-screen .system-requirement-heading {
  font-weight: 600;
  font-size: 32px;
  margin-bottom: 0;
  margin-top: 31px;
  text-align: center;
  margin-top: 25px;
  font-style: var(--font-style);
  color: var(--text-color);
}

.system-requirement-test-screen .container-prompt {
  width: 97%;
}

.system-requirement-test-screen .system-requirement-description {
  font-family: Poppins, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
  text-align: center;
  color: #8D979F;
  width: 650px;
  margin: 30px auto 0;
  font-style: var(--font-style);
}

@media (max-width: 720px) {
  .system-requirement-test-screen .system-requirement-description {
    width: 98%;
  }
}

.system-requirement-test-screen .container-box {
  display: flex;
  justify-content: center;
}

.system-requirement-test-screen .container {
  text-align: center;
}

.system-requirement-test-screen .container-top {
  margin: 25px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.system-requirement-test-screen .container-middle {
  display: flex;
  margin: 45px 0 50px;
}

@media (max-width: 720px) {
  .system-requirement-test-screen .container-middle {
    width: 100%;
  }
}

.system-requirement-test-screen .grey-box,
.system-requirement-test-screen .red-box,
.system-requirement-test-screen .green-box {
  border-radius: 4px;
  width: 42%;
  height: 100px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 16px;
}

.system-requirement-test-screen .grey-box {
  border: 2px solid #dbe4eb;
}

.system-requirement-test-screen .red-box {
  border: 2px solid #e95e5e;
  background-color: #f6f6f9;
  cursor: pointer;
}

.system-requirement-test-screen .green-box {
  border: 2px solid #2FCE82;
}

@media (max-width: 720px) {
  .system-requirement-test-screen .grey-box,
  .system-requirement-test-screen .red-box,
  .system-requirement-test-screen .green-box {
    width: 90%;
    margin: 0 auto;
  }
}

.system-requirement-test-screen .green-box-right {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin: auto;
  align-items: center;
}

.system-requirement-test-screen .grey-box-left {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.system-requirement-test-screen label{
  font-style:var(--font-style);
}

.system-requirement-test-screen .grey-box-left img {
  width: 28px;
}

.system-requirement-test-screen .green-box-left {
  display: flex;
  margin-top: 10px;
  margin-right: 5px;
  justify-content: flex-end;
  align-items: flex-start;
}

.system-requirement-test-screen .grey-box-right {
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
}
.system-requirement-test-screen .grey-box-right label{
  color: var(--text-color);
  font-style: var(--font-style);
}

.system-requirement-test-screen .grey-box-right img {
  width: 42px;
  height: 42px;
}

.system-requirement-test-screen .src-msg {
  font-family: Poppins, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
  text-align: center;
  color: #8D979F;
  margin: 30px auto 0;
}

.system-requirement-test-screen .src-msg-link {
  color: var(--primaryColor);
  text-decoration: underline;
  cursor: pointer;
}

.system-requirement-test-screen .box-section {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 720px) {
  .system-requirement-test-screen .box-section {
    flex-direction: column;
    width: 100%;
  }
}

.system-requirement-test-screen .button-section {
  display: flex;
  justify-content: center;
  column-gap:10px;
  align-items: center;
}

@media (max-width: 720px) {
  .system-requirement-test-screen .button-section button {
    width: 50% !important;
  }
}

.system-requirement-test-screen .btn-next {
  width: 200px;
  height: 45px;
  background: #F6F6F9;
  border-radius: 5px;
  border: none;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #A7ABB2;
}

.system-requirement-test-screen .img-rotate {
  animation: spin 3s linear infinite;
}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`;

export const systemDiagnosticCss =`.system-diagnostic-test-screen {
  display: flex;
  flex-direction: column;
}

@media (max-width: 720px) {
  .system-diagnostic-test-screen .prompt-image {
    width: 100%;
  }
}

.system-diagnostic-test-screen .heading {
  font-weight: 600;
  font-size: 32px;
  margin-bottom: 0;
  margin-top: 31px;
  text-align: center;
  color: var(--text-color);
}

.system-diagnostic-test-screen .container-prompt {
  width: 97%;
}

.system-diagnostic-test-screen .description {
  font-family: Poppins, sans-serif;
  font-style: var(--font-style);
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
  text-align: center;
  color: #8D979F;
  width: 650px;
  margin: 10px auto 10px;
}

@media (max-width: 720px) {
  .system-diagnostic-test-screen .description {
    width: 98%;
  }
}

.system-diagnostic-test-screen .container-box {
  display: flex;
  justify-content: center;
}

.system-diagnostic-test-screen .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.system-diagnostic-test-screen .container-top {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.system-diagnostic-test-screen .container-middle {
  display: flex;
  /* flex-direction: column; */
  margin: 20px 0;
}

@media (max-width: 720px) {
  .system-diagnostic-test-screen .container-middle {
    width: 100%;
  }
}
.system-diagnostic-test-screen label{
font-style:var(--font-style);}
.system-diagnostic-test-screen .grey-box {
  border: 1px solid #f6f6f9;
  border-radius: 4px;
  width: 118px;
  height: 100px;
  display: flex;
  position: relative;
}

@media (max-width: 720px) {
  .system-diagnostic-test-screen .grey-box {
    width: 90%;
    margin: 0 auto;
  }
}

.system-diagnostic-test-screen .grey-box .green-box-right {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin: auto;
  align-items: center;
}

.system-diagnostic-test-screen .grey-box .grey-box-left {
  display: flex;
  margin-top: 7px;
  margin-right: 7px;
  justify-content: flex-end;
  align-items: flex-start;
  position: absolute;
  right: 0px;
}

.system-diagnostic-test-screen .grey-box .grey-box-left img {
  width: 21px;
}

.system-diagnostic-test-screen .red-box {
  border: 1px solid #eca9a9;
  background-color: #f6f6f9;
  cursor: pointer;
  border-radius: 4px;
  width: 200px;
  height: 120px;
  display: flex;
  position: relative;
}

@media (max-width: 720px) {
  .system-diagnostic-test-screen .red-box {
    width: 90%;
    margin: 0 auto;
  }
}

.system-diagnostic-test-screen .red-box .green-box-right {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin: auto;
  align-items: center;
}

.system-diagnostic-test-screen .red-box .grey-box-left {
  display: flex;
  margin-top: 7px;
  margin-right: 7px;
  justify-content: flex-end;
  align-items: flex-start;
  position: absolute;
  right: 0px;
}

.system-diagnostic-test-screen .red-box .grey-box-left img {
  width: 28px;
}

.system-diagnostic-test-screen .green-box {
  border: 1px solid #C3E8D6;
  border-radius: 4px;
  width: 200px;
  height: 120px;
  display: flex;
  position: relative;
}

@media (max-width: 720px) {
  .system-diagnostic-test-screen .green-box {
    width: 90%;
    margin: 0 auto;
  }
}

.system-diagnostic-test-screen .green-box .green-box-right {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin: auto;
  align-items: center;
}

.system-diagnostic-test-screen .green-box .grey-box-left {
  display: flex;
  margin-top: 7px;
  margin-right: 7px;
  justify-content: flex-end;
  align-items: flex-start;
  position: absolute;
  right: 0px;
}

.system-diagnostic-test-screen .green-box .grey-box-left img {
  width: 28px;
}

.system-diagnostic-test-screen .green-box-left {
  display: flex;
  margin-top: 10px;
  margin-right: 5px;
  justify-content: flex-end;
  align-items: flex-start;
}

.system-diagnostic-test-screen .grey-box-right {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin: auto;
  align-items: center;
}
.system-diagnostic-test-screen .grey-box-right  img{
    width: 35px;
}

.system-diagnostic-test-screen .grey-box-right  label{
  font-size: 16px;
  color: var(--text-color);
}

.system-diagnostic-test-screen .box-section {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

@media (max-width: 720px) {
  .system-diagnostic-test-screen .box-section {
    flex-direction: column;
    width: 100%;
  }
}

.system-diagnostic-test-screen .button-section {
  display: flex;
  justify-content: center;
  column-gap:10px;
  align-items: center;
}

@media (max-width: 720px) {
  .system-diagnostic-test-screen .button-section button {
    width: 50% !important;
  }
}

.system-diagnostic-test-screen .btn-next {
  width: 200px;
  height: 45px;
  background: #F6F6F9;
  border-radius: 5px;
  border: #F6F6F9;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #A7ABB2;
}

.system-diagnostic-test-screen .img-rotate {
  -webkit-animation: spin 3s linear infinite;
  -moz-animation: spin 3s linear infinite;
  animation: spin 3s linear infinite;
}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.orange-hollow-btn{
  border-style: none;
	font-size: 1em;
	color: var(--theme-color);
	font-weight: 500;
	border-radius: 5px;
	padding: 10px 20px;
  background-color: var(--theme-mode);
  font-style: var(--font-style);
  border: 1px solid var(--theme-color);
  cursor: pointer;
	&:disabled {
		color: #A7ABB2 !important;
		border: 1px solid #F6F6F9 !important;
		background-color: transparent !important;
    cursor:not-allowed;
	}
	&:hover {
		box-shadow: 1px 1px 2px rgb(32 33 36 / 28%)
	}

	&:focus {
		outline: none;
	}

	&:disabled {
		background-image: none;
	}

	&:active {
		transform: scale(0.98); 
	}
}

.orange-filled-btn {
	border-style: none;
	font-size: 1em;
  font-style: var(--font-style);
	color: white;
	font-weight: 500;
	border-radius: 5px;
	padding: 10px 20px;
  background-color: var(--theme-color);
  cursor: pointer;
	&:disabled {
		background-color: rgba(from var(--theme-color) r g b / 0.5);
    color: var(--text-color) !important;
    cursor: not-allowed;
	}
	&:hover {
		box-shadow: 1px 1px 2px rgb(32 33 36 / 28%)
	}

	&:focus {
		outline: none;
	}

	&:disabled {
		background-image: none;
	}

	&:active {
		transform: scale(0.98); 
	}
}`;

export const browserSecurityCss =`.browswer-security-test-screen {
  display: flex;
  flex-direction: column;
}

@media (max-width: 720px) {
  .browswer-security-test-screen .prompt-image {
    width: 100%;
  }
}

.browswer-security-test-screen .heading {
  font-weight: 600;
  font-size: 32px;
  margin-bottom: 0;
  margin-top: 23px;
  text-align: center;
  color: var(--text-color);
}

.browswer-security-test-screen .container-prompt {
  width: 97%;
}

.browswer-security-test-screen .description {
  font-family: Poppins, sans-serif;
  font-style: var(--font-style);
  font-weight: normal;
  font-size: 14px;
  line-height: 160%;
  text-align: center;
  color: #8D979F;
  width: 650px;
  margin: 5px auto 5px;
}

@media (max-width: 720px) {
  .browswer-security-test-screen .description {
    width: 98%;
  }
}

.browswer-security-test-screen .container-box {
  display: flex;
  justify-content: center;
}

.browswer-security-test-screen .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.browswer-security-test-screen .container-top {
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.browswer-security-test-screen .container-middle {
  display: flex;
  flex-direction: column;
  margin: 10px 0 0 0;
}

@media (max-width: 720px) {
  .browswer-security-test-screen .container-middle {
    width: 100%;
  }
}

.browswer-security-test-screen .grey-box {
  border: 1px solid #f6f6f9;
  border-radius: 4px;
  width: 140px;
  height: 100px;
  display: flex;
  position: relative;
}

@media (max-width: 720px) {
  .browswer-security-test-screen .grey-box {
    width: 90%;
    margin: 0 auto;
  }
}

.browswer-security-test-screen .grey-box .green-box-right {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin: auto;
  align-items: center;
}

.browswer-security-test-screen .grey-box .grey-box-left {
  display: flex;
  margin-top: 7px;
  margin-right: 7px;
  justify-content: flex-end;
  align-items: flex-start;
  position: absolute;
  right: 0px;
}

.browswer-security-test-screen .grey-box .grey-box-left img {
  width: 21px;
}

.browswer-security-test-screen .red-box {
  border: 1px solid #eca9a9;
  background-color: #f6f6f9;
  cursor: pointer;
  border-radius: 4px;
  width: 200px;
  height: 120px;
  display: flex;
  position: relative;
}

@media (max-width: 720px) {
  .browswer-security-test-screen .red-box {
    width: 90%;
    margin: 0 auto;
  }
}

.browswer-security-test-screen .red-box .green-box-right {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin: auto;
  align-items: center;
}

.browswer-security-test-screen .red-box .grey-box-left {
  display: flex;
  margin-top: 7px;
  margin-right: 7px;
  justify-content: flex-end;
  align-items: flex-start;
  position: absolute;
  right: 0px;
}

.browswer-security-test-screen .red-box .grey-box-left img {
  width: 28px;
}

.browswer-security-test-screen .green-box {
  border: 1px solid #C3E8D6;
  border-radius: 4px;
  width: 200px;
  height: 120px;
  display: flex;
  position: relative;
}

@media (max-width: 720px) {
  .browswer-security-test-screen .green-box {
    width: 90%;
    margin: 0 auto;
  }
}

.browswer-security-test-screen .green-box .green-box-right {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin: auto;
  align-items: center;
}

.browswer-security-test-screen .green-box .grey-box-left {
  display: flex;
  margin-top: 7px;
  margin-right: 7px;
  justify-content: flex-end;
  align-items: flex-start;
  position: absolute;
  right: 0px;
}

.browswer-security-test-screen .green-box .grey-box-left img {
  width: 28px;
}

.browswer-security-test-screen .green-box-left {
  display: flex;
  margin-top: 10px;
  margin-right: 5px;
  justify-content: flex-end;
  align-items: flex-start;
}

.browswer-security-test-screen .grey-box-right {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin: auto;
  align-items: center;
}
.browswer-security-test-screen .grey-box-right  img{
    width: 35px;
}

.browswer-security-test-screen .grey-box-right  label{
  font-size: 16px;
  color: var(--text-color);
}

.browswer-security-test-screen .box-section {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin: 0 auto;
}

@media (max-width: 720px) {
  .browswer-security-test-screen .box-section {
    flex-direction: column;
    width: 100%;
  }
}

.browswer-security-test-screen .button-section {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap:15px;
  width: 76%;
  margin: 15px auto 0px auto;
}

@media (max-width: 720px) {
  .browswer-security-test-screen .button-section button {
    width: 50% !important;
  }
}

.browswer-security-test-screen .btn-next {
  width: 200px;
  height: 45px;
  background: #F6F6F9;
  border-radius: 5px;
  border: #F6F6F9;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #A7ABB2;
}

.browswer-security-test-screen .img-rotate {
  -webkit-animation: spin 3s linear infinite;
  -moz-animation: spin 3s linear infinite;
  animation: spin 3s linear infinite;
}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.orange-hollow-btn{
  border-style: none;
	font-size: 1em;
	color: var(--theme-color);
	font-weight: 500;
	border-radius: 5px;
	padding: 10px 20px;
  background-color: var(--theme-mode);
  font-style: var(--font-style);
  border: 1px solid var(--theme-color);
  cursor: pointer;
	&:disabled {
		color: #A7ABB2 !important;
		border: 1px solid #F6F6F9 !important;
		background-color: transparent !important;
    cursor:not-allowed;
	}
	&:hover {
		box-shadow: 1px 1px 2px rgb(32 33 36 / 28%)
	}

	&:focus {
		outline: none;
	}

	&:disabled {
		background-image: none;
	}

	&:active {
		transform: scale(0.98); 
	}
}
.browser-prompt-image{
    width: 330px;
    height: 198px;
    object-fit: contain;
}
.orange-filled-btn {
	border-style: none;
	font-size: 1em;
  font-style: var(--font-style);
	color: white;
	font-weight: 500;
	border-radius: 5px;
	padding: 10px 20px;
  background-color: var(--theme-color);
  cursor: pointer;
	&:disabled {
		background-color: rgba(from var(--theme-color) r g b / 0.5);
    color: var(--text-color) !important;
    cursor: not-allowed;
	}
	&:hover {
		box-shadow: 1px 1px 2px rgb(32 33 36 / 28%)
	}

	&:focus {
		outline: none;
	}

	&:disabled {
		background-image: none;
	}

	&:active {
		transform: scale(0.98); 
	}
}`;

export const preValidationCss = `.pvi-container {
  display: flex;
  flex-direction: column;
  margin: auto;
}
.pvi-query-timer{
  color: var(--theme-color);
  text-align: center;
  margin-bottom: 5px;
}
.ivsf-container{
  margin-top: -15px;
}
.pvi-wrapper {
  margin: auto;
  display: flex;
  flex-direction: column;
}

.pvi-header-img {
  margin: 20px auto 0px;
  height: 230px;
}
.pvi-instruction-img{
  width: 40px;
  height: 40px;
}
.multi-device-block {
  margin: auto;
  gap: 10px;
  display: flex;
  margin-top: 30px;
  justify-content: center;
}
.multi-device-block select {
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 100%;
}

.multi-device-block label {
  font-size: 13px;
}
.camera-container{
}
.camera-container select{
  font-style: var(--font-style);
  background-color:var(--theme-mode);
  color: var(--text-color);
}
.microphone-container{
}
.microphone-container select{
  font-style: var(--font-style);
  background-color:var(--theme-mode);
  color: var(--text-color);
}
.pvi-header-title {
  font-family: Poppins, sans-serif;
  font-style: var(--font-style);
  font-weight: bold;
  font-size: 26px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #222222;
  margin: 0px auto 0px;
  color: var(--text-color);
}
.my-recorded-video{
  height: 245px;
}
.pvi-msg {
  font-family: Poppins, sans-serif;
  font-style: var(--font-style);
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
  display: flex;
  align-items: center;
  text-align: center;
  color: #8D979F;
  margin: 0px auto 0px;
}

.pvi-instructions-container {
  display: flex;
  flex-direction: row;
  margin: 10px auto 0px;
}

.pvi-instructions-img {
  height: 48px;
  width: 48px;
  border-radius: 0px;
}

.pvi-instruction-txt {
  font-family: Poppins, sans-serif;
  font-style: var(--font-style);
  color: var(--text-color);
  font-weight: 500;
  font-size: 13px;
  line-height: 24px;
  display: flex;
  align-items: center;
  margin: 0px 15px 0px 5px;
}

.pvi-query-msg {
  font-family: Poppins, sans-serif;
  font-style: var(--font-style);
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 9px auto 0px;
  cursor: pointer;
  margin-bottom:10px;
  color: #8D979F;
}

.pvi-btn-container {
  margin: 0px 0px 0px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pvi-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 11px 32px;
  background: #0087FD;
  border-radius: 5px;
  border: 0px;
  color: #ffffff;
  margin: auto;
  cursor: pointer;
}
`;

export const identityStepsCss = `.ivs-container {
  margin: auto;
  display: flex;
  flex-direction: column;
}
.steps-container{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}
@media (max-width: 720px) {
  .ivs-container {
      overflow: auto;
      width: 98%;
  }
}

.ivs-header-img {
  width: 411px;
  height: 230px;
  border-radius: 5px;
  margin: 30px auto 0;
}

.ivs-instructions-container {
  text-align: center;
  display: flex;
  flex-direction: row;
  margin: 20px auto 0;
}

.ivs-instruction {
  display: flex;
  flex-direction: row;
}

.ivs-instruction-step-container {
  margin: 6px 10px 0 5px;
}

.ivs-instruction-step {
  display: flex;
  align-items: center;
  font-family: Poppins, sans-serif;
  font-style: var(--font-style);
  font-weight: normal;
  font-size: 13px;
  line-height: 19px;
  color: #B7C5D1;
}

.ivs-instruction-txt {
  font-family: Poppins, sans-serif;
  font-style: var(--font-style);
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  white-space: nowrap;
  align-items: center;
  color: var(--text-color);
  border-bottom: 3.5px solid var(--text-color);
  border-radius: 1px;
  padding-bottom: 10px;
}

.ivs-instruction-txt-orange {
  font-family: Poppins, sans-serif;
  white-space: nowrap;
  font-style: var(--font-style);
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: var(--theme-color);
  border-bottom: 3.5px solid var(--theme-color);
  border-radius: 1px;
  padding-bottom: 10px;
}

.ivs-btn-container {
  margin: 35px 0 auto;
}

.ivs-query-msg {
  font-family: Poppins, sans-serif;
  font-style: var(--font-style);
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #8D979F;
  margin: 16px auto 0;
}

.ivs-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 11px 32px;
  background: #0087FD;
  border-radius: 5px;
  border: 0;
  color: #ffffff;
  margin: auto;
  cursor: pointer;
}
`;

export const IdentityVerificationScreenOneCss = `.ivso-container {
  margin-left: auto;
  display: flex;
  font-family: 'Poppins', sans-serif;
  justify-content: center;
	flex-direction: column;
}

.ivso-first-wrapper {
	display: flex;
	flex-direction: column;
}
.ivso-webcam-container{
	display: flex;
	align-items: center;
	justify-content: center;
}
.ivso-header-title {
	font-family: Poppins;
	color: var(--text-color);
	font-style: var(--font-style);
	font-weight: bold;
	font-size: 32px;
	display: flex;
	align-items: center;
	text-align: center;
	margin: 0px auto 7px;
}

.ivso-msg {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: normal;
	font-size: 16px;
	display: flex;
	align-items: center;
	text-align: center;
	color: #8D979F;
	margin: 15px auto 7px;
}

.ivso-header-img-container {
	position: relative;
	margin: 0px auto 0px;
}
.ivso-captured-img{
	width: 350px;
	height: 274px;
	object-fit: cover;
}

.ivso-header-img {
	height: 300px;
	border-radius: 5px;
}

.ivso-header-img-result {
	position: absolute;
	top: 15px;
	right: 15px;
	height: 20px;
}

.ivso-screen-grid {
	position: absolute;
	right: -169px;
	top: 37px;
	height: 195px;
}
.ivso-webcam-container video{
	object-fit: cover;
}
@media (max-width: 720px) {
	.ivso-header-img-container {
		width: 98%;
	}

	.ivso-header-img-container video {
		width: 98%;
	}

	.ivso-header-img {
		width: 98%;
		object-fit: cover;
	}

	.ivso-screen-grid {
		left: 15px;
		top: 50px;
		width: 90%;
	}
}

.ivso-instructions-container {
	text-align: center;
	display: flex;
	flex-direction: row;
	margin: 20px auto 0px;
}

.ivso-instructions-img {
	height: 48px;
	width: 48px;
	border-radius: 0px;
}

.ivso-instruction-step-container {
	margin: 0px 25px 0px 5px;
}

.ivso-instruction-step {
	display: flex;
	align-items: center;
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: normal;
	font-size: 13px;
	line-height: 19px;
	color: #B7C5D1;
}

.ivso-instruction-txt {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	display: flex;
	align-items: center;
	color: #222222;
}

.ivso-btn-container {
	margin: 10px auto 0px;
	display: flex;
	flex-direction: row;
	column-gap: 20px;
}

.ivso-query-msg {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: normal;
	font-size: 14px;
	line-height: 21px;
	display: flex;
	align-items: center;
	text-align: center;
	color: #8D979F;
	margin: 0px auto 0px;
}

.ivso-retake-btn,
.ivso-btn {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 11px 32px;
	border-radius: 5px;
	color: #ffffff;
	margin: auto;
	cursor: pointer;
}

.ivso-retake-btn {
	background: #0087FD;
	border: 0px;
}

.ivso-btn {
	background: #0087FD;
	border: 0px;
}
`;

export const IdentityVerificationScreenTwoCss = `
.ivst-container {
    margin: auto;
}

.ivst-wrapper {
    display: flex;
    flex-direction: column;
}

.ivst-header-img-container {
    position: relative;
    margin: 10px auto 0px;
}

@media (max-width: 720px) {
    .ivst-header-img-container {
        width: 98%;
    }
    .ivst-header-img-container video {
        width: 98%;
    }
}

.ivst-header-img {
    height: 280px;
    border-radius: 5px;
}

@media (max-width: 720px) {
    .ivst-header-img {
        width: 100%;
        object-fit: cover;
    }
}

.ivst-header-img-result {
    position: absolute;
    top: 15px;
    right: 15px;
    height: 20px;
}

@media (max-width: 720px) {
    .ivst-header-img-result {
        top: 28px;
    }
}

.ivst-screen-grid {
    position: absolute;
    left: 19px;
    top: 37px;
    height: 187px;
}

@media (max-width: 720px) {
    .ivst-screen-grid {
        width: 85%;
    }
}

.step-2-header-title {
    font-family: Poppins;
    font-style: var(--font-style);
    color: var(--text-color);
    font-weight: bold;
    font-size: 35px;
    display: flex;
    align-items: center;
    text-align: center;
    margin: 5px auto 0px;
}

.ivst-msg {
    font-family: Poppins;
    font-style: var(--font-style);
    font-weight: normal;
    font-size: 15px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #8D979F;
    margin: 0px auto 0px;
}

.ivst-instructions-container {
    text-align: center;
    display: flex;
    flex-direction: row;
    margin: 20px auto 0px;
}

.ivst-instructions-img {
    height: 48px;
    width: 48px;
    border-radius: 0px;
}

.ivst-instruction-step-container {
    margin: 0px 25px 0px 5px;
}

.ivst-instruction-step {
    display: flex;
    align-items: center;
    font-family: Poppins;
    font-style: var(--font-style);
    font-weight: normal;
    font-size: 13px;
    line-height: 19px;
    color: #B7C5D1;
}

.ivst-instruction-txt {
    font-family: Poppins;
    font-style: var(--font-style);
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    color: #222222;
}

.ivst-btn-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 20px auto 0px;
}

@media (max-width: 720px) {
    .ivst-btn-container {
        flex-direction: column;
        margin: 30px 0 0 0;
    }
}

.ivst-query-msg {
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    color: #8D979F;
    margin: 6px auto 0px;
    max-width: 600px;
}
.first-header-msg {
    font-family: Poppins;
    font-style: var(--font-style);
    font-weight: normal;
    font-size: 16px;
    line-height: 160%;
    display: flex;
    align-items: center;
    text-align: center;
    color: #8D979F;
    margin: 0px auto 0px;
}
.ivst-header-title {
    font-weight: bold;
    font-size: 32px;
    display: flex;
    align-items: center;
    text-align: center;
    color: var(--text-color);
    margin: 0px auto 0px;
}

.ivst-file {
    text-decoration: underline;
    color: var(--theme-color); /* Assuming $primaryColor is defined in colors.scss */
    cursor: pointer;
}
`;

export const IdentityVerificationScreenThreeCss = `.ivst-container {
  display: flex;
  flex-direction: column;
}

.ivst-container #audio-wave {
  width: 600px;
  height: 140px;
  margin: 0 auto;
}

@media (max-width: 720px) {
  .ivst-container #audio-wave {
      width: 100%;
      height: 150px;
  }
}

.ivst-container .recording-text {
  text-align: center;
  font-size: 18px;
  color: var(--theme-color); /* $primaryColor */
  text-transform: capitalize;
}

.ivst-container .ivst-wrapper {
  margin: auto;
  display: flex;
  flex-direction: column;
}

@media (max-width: 720px) {
  .ivst-container .ivst-wrapper {
      margin: 0;
  }
}

.ivst-container .ivst-header-img {
  width: 411px;
  height: 230px;
  border-radius: 5px;
  margin: 30px auto 0px;
}

.ivst-container .ivst-header-title {
  font-weight: bold;
  font-size: 35px;
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--text-color);
  margin: 15px auto 0px;
}

.ivst-container .ivst-query-msg {
  color: #8d979f;
  font-size: 16px;
  margin-top: 14px;
  margin-bottom: 0px;
  text-align: center;
}

.ivst-container .mic-checking-txt {
  text-align: center;
  font-size: 16px;
}

.ivst-container .audio-timer {
  text-align: center;
  font-size: 16px;
}

.ivst-container .audio-timer span {
  color: var(--theme-color); /* $primaryColor */
  font-size: 17px;
  font-weight: 500;
}

.ivst-container .error-msg {
  color: red;
  font-size: 16px;
  margin-top: 14px;
  margin-bottom: 0px;
  text-align: center;
}

.ivst-container .audio-test-msg {
  font-size: 15px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #8d979f;
  margin: 15px auto 0px;
}

.ivst-container .ivst-instructions-container {
  text-align: center;
  display: flex;
  flex-direction: row;
  margin: 20px auto 0px;
}

.ivst-container .ivst-instructions-img {
  height: 48px;
  width: 48px;
  border-radius: 0px;
}

.ivst-container .ivst-instruction-step-container {
  margin: 0px 25px 0px 5px;
}

.ivst-container .ivst-instruction-step {
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 19px;
  color: #b7c5d1;
}

.ivst-container .volum-checker {
  text-align: center;
  color: red;
  font-size: 16px;
}

.ivst-container .ivst-instruction-txt {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #222222;
}

.ivst-container .ivst-btn-container {
  display: flex;
  margin: 20px auto 0px;
  gap: 20px;
}

@media (max-width: 720px) {
  .ivst-container .ivst-btn-container {
      flex-direction: column;
      margin: 0;
  }
}

.ivst-container .ivst-audio-text {
  padding: 10px 20px;
  background-color: var(--theme-mode);
  color: var(--text-color);
	border: 1px solid white;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  margin: auto;
  border-radius: 5px;
  margin: 20px auto 10px;
}
`;

export const IdentityVerificationScreenFourCss = `.screen-four-container {
	margin: auto;
}
.camera-error-icon{
  width: 200px;
}
.room-scan-wrapper {
	display: flex;
	flex-direction: column;
}

.ivsf-header-img-container {
	position: relative;
	margin: 0px auto 0px;
}

@media(max-width:720px) {
	.ivsf-header-img-container {
		width: 98%;
	}
	.ivsf-header-img-container video {
		width: 98%;
	}
	.my-recorded-video {
		width: 98%;
		margin: 0;
		height: 100%;
	}
}

.my-recorded-video2 {
	width: 400px;
	height: 250px;
}

.ivsf-header-img {
	height: 300px;
	width: 400px;
	border-radius: 5px;
}

.ivsf-recording-badge-container {
	position: absolute;
	right: 10px;
	top: 10px;
	background-color: #E95E5E;
	border-radius: 5px;
	color: #ffffff;
	display: flex;
	align-items: center;
	padding: 5px 10px;
	text-transform: lowercase;
}

.ivsf-recording-dot {
	font-size: 20px;
	margin-right: 5px;
	width: 8px;
}

.ivsf-recording-badge {
	font-size: 12px;
}

.room-scan-header-title {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: bold;
	font-size: 34px;
	display: flex;
	align-items: center;
	text-align: center;
	color: var(--text-color);
	margin: 20px auto 0px !important;
}

.ivsf-msg {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: normal;
	font-size: 15px;
	display: flex;
	align-items: center;
	text-align: center;
	color: #8D979F;
	margin: 0px auto 10px !important;
}

.ivsf-instructions-container {
	text-align: center;
	display: flex;
	flex-direction: row;
	margin: 20px auto 0px;
}

.ivsf-instructions-img {
	height: 48px;
	width: 48px;
	border-radius: 0px;
}

.ivsf-instruction-step-container {
	margin: 0px 25px 0px 5px;
}

.ivsf-instruction-step {
	display: flex;
	align-items: center;
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: normal;
	font-size: 13px;
	line-height: 19px;
	color: #B7C5D1;
}

.ivsf-instruction-txt {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	display: flex;
	align-items: center;
	color: #222222;
}

.ivsf-btn-container {
	display: flex;
	margin: 15px auto 0px !important;
	gap: 20px;
}

@media(max-width:720px) {
	.ivsf-btn-container {
		flex-direction: column;
		margin: 30px 0 0 0;
	}
}

.ivsf-query-msg {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: normal;
	font-size: 14px;
	line-height: 21px;
	display: flex;
	align-items: center;
	text-align: center;
	color: #8D979F;
	margin: 0px auto 0px !important;
}

.ivsf-btn {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 11px 32px;
	background: #0087FD;
	border-radius: 5px;
	border: 0px;
	color: #ffffff;
	margin: auto;
	cursor: pointer;
}
`;

export const MobileProctoringCss = `.mobile-conection-container {
  display: flex;
  flex-direction: column;
}
.button-loader {
    display: flex;
    align-items: center;
    gap: 8px;
}

.spinner-small {
    width: 16px;
    height: 16px;
    border: 2px solid #ffffff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
.ivsf-wrapper {
  margin: auto;
  display: flex;
  flex-direction: column;
}

@media (max-width: 720px) {
  .ivsf-wrapper {
    margin: 0;
  }
}

.mobile-connection-banner {
  margin: 10px auto 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.mobile-connection-banner .banner-image {
  width: 400px;
  height: 240px;
  object-fit: cover;  
  border-radius: 5px;
}

.mobile-connection-banner .banner-info-box {
  background: #e5f3ff;
  width: 272px;
  position: absolute;
  padding: 10px;
  border-radius: 10px;
  right: -198px;
  top: 12%;
}

.mobile-connection-banner .banner-info-box .title {
  display: flex;
  align-items: center;
  gap: 9px;
}

.mobile-connection-banner .banner-info-box .title p {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 0;
  margin-top: 0;
}

.mobile-connection-banner .banner-info-box .desc {
  font-size: 13px;
  color: #8D979F;
  margin-left: 8px;
}

.bottom-desc {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #8D979F;
  width: 53%;
  margin-left: auto;
  font-size: 14px;
  text-align: center;
  margin-right: auto;
}

.bottom-desc p {
  width: 884px;
}

.example-text {
  color: #8d979f;
  font-size: 15px;
}

.bottom-desc-remote {
  width: 700px;
  text-align: start;
  display: flex;
  column-gap: 13px;
  justify-content: center;
  color: #8d979f;
}

.bottom-desc-remote input {
  accent-color: var(--theme-color);
}
.bottom-desc-remote span{
  margin: 0;
  font-size: 15px;
  cursor:pointer;
}
.qr-code-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  row-gap: 10px;
  margin-top: 30px;
}
.qr-code-container canvas{
  width: 200px !important;
  height: 200px !important;
}
.qr-code-container .qr-code {
  background: #F4F7F9;
  padding: 10px;
  border: 0;
}

.qr-code-container .qr-code svg {
  height: 167px !important;
  max-width: 168px !important;
  width: 167px !important;    
}

.remote-mobile-video {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 10px;
  margin-top: 10px;
  position: relative;
}

.remote-mobile-video img {
  width: 350px;
  height: 235px;
  object-fit: cover;
  border-radius: 8px;
}

.remote-mobile-video div video {
  width: 350px;
  height: 235px;
  object-fit: cover;
  border-radius: 8px;
}

.ivsf-header-img {
  height: 300px;
  border-radius: 5px;
  margin: 30px auto 0px;
}

@media (max-width: 720px) {
  .ivsf-header-img {
    width: 100%;
  }
}

.mobile-header-title {
  font-family: Poppins;
  font-style: var(--font-style);
  font-weight: bold;
  font-size: 35px;
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--text-color);
  margin: 15px auto 0px;
}

.ivsf-msg {
  font-family: Poppins;
  font-style: var(--font-style);
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
  display: flex;
  align-items: center;
  text-align: center;
  color: #8D979F;
  margin: 10px auto 0px;
}

.ivsf-instructions-container {
  text-align: center;
  display: flex;
  flex-direction: row;
  margin: 20px auto 0px;
}

.ivsf-instructions-container .ivsf-instructions-img {
  height: 48px;
  width: 48px;
  border-radius: 0px;
}

.ivsf-instruction-step-container {
  margin: 0px 25px 0px 5px;
}

.ivsf-instruction-step {
  display: flex;
  align-items: center;
  font-family: Poppins;
  font-style: var(--font-style);
  font-weight: normal;
  font-size: 13px;
  line-height: 19px;
  color: #B7C5D1;
}

.ivsf-instruction-txt {
  font-family: Poppins;
  font-style: var(--font-style);
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #222222;
}

.mobile-btn-container {
  display: flex;
  justify-content: center;
  margin: 0px auto 0px;
  gap: 20px;
}

@media (max-width: 720px) {
  .ivsf-btn-container {
    margin: 19px 0 0 0;
    flex-direction: column;
  }
}

.ivsf-query-msg {
  font-size: 14px;
  margin: 20px auto 0px;
  color: #8D979F;
}

.mobile-broadcastin-container{
  display: flex;
  align-items: center;
  column-gap: 19px;
}
.remote-mobile-video{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 10px;  
}
.video-loader{
  position: relative;
}
.spinner {
  position: absolute;
  left: 50%;
  top: -115px;
  transform: translate(-50%, -50%);
  z-index: 214748364;
  text-align: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 100%;
  display: inline-block;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  animation-delay: -0.32s;
  background-color: var(--theme-color);;
}

.spinner .bounce2 {
  animation-delay: -0.16s;
  background-color: var(--theme-color);;
}

.spinner .bounce3 {
  animation-delay: -0.16s;
  background-color: var(--theme-color);;
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
      transform: scale(0);
  }
  40% {
      transform: scale(1);
  }
}
`;

export const IdentityVerificationScreenFiveCss = `.screen-share-container {
	display: flex;
	flex-direction: column;
}

.screen-wrapper {
	margin: auto;
	display: flex;
	flex-direction: column;
}

@media (max-width: 720px) {
	.screen-wrapper {
		margin: 0;
	}
}

.screen-share-dummy {
	height: 230px;
	display: flex;
	border-radius: 5px;
	align-items: center;
	justify-content: center;
	margin-top: 5px;
	margin-bottom: 5px;
}

@media (max-width: 720px) {
	.screen-share-dummy {
		width: 100%;
	}
}

.ivsf-header-titles {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: bold;
	font-size: 35px;
	display: flex;
	align-items: center;
	text-align: center;
	color: var(--text-color);
	margin: 22px auto 0;
}

.screen-desc {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: normal;
	font-size: 15px;
	display: flex;
	align-items: center;
	text-align: center;
	color: #8D979F;
	margin: 10px auto 0;
}

.ivsf-instructions-container {
	text-align: center;
	display: flex;
	flex-direction: row;
	margin: 20px auto 0;
}

.ivsf-instructions-img {
	height: 48px;
	width: 48px;
	border-radius: 0;
}

.ivsf-instruction-step-container {
	margin: 0 25px 0 5px;
}

.ivsf-instruction-step {
	display: flex;
	align-items: center;
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: normal;
	font-size: 13px;
	line-height: 19px;
	color: #B7C5D1;
}

.ivsf-instruction-txt {
	font-family: Poppins;
	font-style: var(--font-style);
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	display: flex;
	align-items: center;
	color: #222222;
}

.ivsf-btn-container {
	display: flex;
	justify-content: center;
	margin: 35px auto 55px;
	gap: 20px;
}

@media (max-width: 720px) {
	.ivsf-btn-container {
		margin: 19px 0 0 0;
		flex-direction: column;
	}
}

.ivsf-query-msg {
	font-size: 14px;
	margin: 20px auto 0;
	color: #8D979F;
  padding-top:8px;
}
`;

export const spinner = `.spinner {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 214748364;
    text-align: center;
}

.spinner > div {
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 100%;
    display: inline-block;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
    animation-delay: -0.32s;
    background-color: var(--theme-color);;
}

.spinner .bounce2 {
    animation-delay: -0.16s;
    background-color: var(--theme-color);;
}

.spinner .bounce3 {
    animation-delay: -0.16s;
    background-color: var(--theme-color);;
}

@keyframes sk-bouncedelay {
    0%, 80%, 100% {
        transform: scale(0);
    }
    40% {
        transform: scale(1);
    }
}
`;

export const startRecordingCSS =`
.local-video-container {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 120px;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f0f0f0;
}
  
body{
  position: relative;
}

.local-video-container video {
  width: 100%;
  height: auto;
  display: block;
}
.remote-video{
  display: flex;
  justify-content: center;
}
.remote-video .video-attached{
  width: 180px;
  height: 140px;
  object-fit: cover;
}

.user-videos-remote{
  display: flex;
  position: absolute;
  bottom: 10px;
  column-gap: 10px;
  row-gap: 9px;
  flex-direction: column;
  width: 220px;
  background: var(--video-style);
  border-radius: 10px;
  box-shadow: 1px 1px 5px 1px #f1f1f1;
  z-index: 9999999;
  left: 10px;
  max-height:fit-content;
  padding-bottom:10px;
}

.user-videos-remote .user-video-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
}
.user-videos-remote .user-video-header .recording-heading{
  font-size: 12px;
  margin-bottom: 9px;
  width: 112px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  color:var(--text-color);
}

.recording-badge-container-header {
    position: absolute;
    right: 10px;
    width: 71px;
    white-space: nowrap;
    background-color: #e95e5e;
    border-radius: 5px;
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 9px;
    column-gap: 0px;
    padding: 5px 5px;
    text-transform: lowercase;
    text-overflow: ellipsis;
    overflow: hidden;
}

.permission-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  animation: fadeIn 0.3s ease-out;
}

.permission-modal {
  background: white;
  border-radius: 12px;
  padding: 0;
  max-width: 500px;
  overflow:auto;
  width: 90%;
  max-height: 90vh;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
  position: relative;
}

.permission-modal-header {
  background: var(--theme-color);
  color: white;
  padding: 24px;
  text-align: center;
  position: relative;
}

.permission-modal-header::before {
  content: '📹';
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
  animation: pulse 2s infinite;
}

.permission-modal-header h3 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.permission-modal-body {
  padding: 32px 24px;
  background-color:var(--theme-mode);
}

.permission-instructions p {
  color: #333;
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 20px 0;
}

.permission-instructions p:first-of-type {
  font-weight: 500;
  color: var(--text-color);
}

.permission-instructions ol {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px 20px 20px 40px;
  margin: 24px 0;
  border-left: 4px solid #ff6b6b;
}

.permission-instructions ol li {
  color: #2c3e50;
  font-size: 15px;
  line-height: 1.8;
  margin-bottom: 8px;
  position: relative;
}

.permission-instructions ol li::marker {
  font-weight: bold;
  color: #ff6b6b;
}

.browser-instructions {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
}

.browser-instructions h4 {
  margin: 0 0 12px 0;
  color: #856404;
  font-size: 16px;
}

.browser-instructions ul {
  margin: 0;
  padding-left: 20px;
  color: #856404;
}

.browser-instructions ul li {
  margin-bottom: 4px;
  font-size: 14px;
}

.permission-modal-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
}

.permission-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  min-width: 120px;
}


.permission-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: background 0.3s ease;
}

.permission-modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { 
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .permission-modal {
    width: 95%;
    margin: 20px;
  }

  .permission-modal-buttons {
    flex-direction: column;
  }

  .permission-btn {
    width: 100%;
  }
}
.recording-badge-container-header .recording-text{
  margin: 0;
  font-size: 10px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.user-videos-remote .btn-container{
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 11px;
  padding-bottom: 10px;
}

.user-videos-remote .btn-container .arrow-icon-btn{
  border: 2px solid var(--primary-color);
  padding: 6px;
  width: 40px;
  height: auto;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-videos-remote .btn-container .arrow-icon-btn .bottom-icon{
  transform: rotate(180deg);
}

/* Footer Styles */
.webcam-footer-wrapper {
  flex-shrink: 0;
  padding: 8px;
  border-top: 1px solid #d1d9e6;
}

.user-view-footer {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 0;
}

.zoom-btns {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #ccd5e2;
  background: white;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.zoom-btns:hover {
  background: #f5f5f5;
  border-color: #999;
}

.zoom-btns:active {
  background: #e9e9e9;
}

.zoom-btns:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
`;