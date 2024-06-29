
document.getElementById("downloadButton").addEventListener("click", function() {

    html2canvas(document.getElementById("resultTable")).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'CustomerExperienceMaturityAssessment.png';
        link.click();
    });
});

document.getElementById("resetButton").addEventListener("click", function() {

    if (confirm("Bạn có chắc chắn muốn reset ứng dụng không?")) {
        location.reload();
    }
});


document.getElementById("shareResultsButton").addEventListener("click", function() {
    document.getElementById("questionContainer").classList.add("hidden");
    document.getElementById("shareModal").classList.remove("hidden");
    document.getElementById("assessmentForm").classList.add("hidden");
    document.getElementById("introduction").classList.add("hidden");
    document.getElementById("resultTable").classList.add("hidden");

});

document.getElementById("back").addEventListener("click", function() {
    location.reload();
});

document.getElementById("showEmail").addEventListener("click", function() {
    document.getElementById("shareModal").classList.add("hidden");
    document.getElementById("emailFormModal").classList.remove("hidden");
});
document.getElementById("back-ShareModal").addEventListener("click", function() {
    document.getElementById("shareModal").classList.remove("hidden");
    document.getElementById("emailFormModal").classList.add("hidden");
});


document.getElementById("startButton").addEventListener("click", function() {
    document.getElementById("assessmentForm").classList.add("hidden");
    document.getElementById("introduction").classList.remove("hidden");
});

document.getElementById("beginTestButton").addEventListener("click", function() {
    alert("Bắt đầu làm bài!");

    const questionContainer = document.getElementById("questionContainer");
    const introduction = document.getElementById("introduction");
    const questionsDiv = document.getElementById("questions");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const submitButton = document.getElementById("submitButton");
    const questionNumberDiv = document.getElementById("questionNumber");

    let questions = [];
    let currentQuestionIndex = 0;
    let scores = [];

    fetch('package.json')
        .then(response => response.json())
        .then(data => {
            questions = data.questions;
            scores = new Array(questions.length).fill(null); // Initialize scores array
            showQuestion(currentQuestionIndex);
        })
        .catch(error => console.error('Error fetching questions:', error));

    function showQuestion(index) {
        questionsDiv.innerHTML = '';

        if (index >= 0 && index < questions.length) {
            const question = questions[index];
            const questionTitle = document.createElement('question-info');
            questionTitle.innerText = question.title;
            questionsDiv.appendChild(questionTitle);

            question.options.forEach(option => {
                const optionDiv = document.createElement('div');
                const optionInput = document.createElement('input');
                optionInput.type = 'radio';
                optionInput.name = `question-${question.id}`;
                optionInput.id = `question-${question.id}-option-${option.id}`;
                optionInput.value = option.score;

                // Check if this option was previously selected
                if (scores[index] === option.score) {
                    optionInput.checked = true;
                }

                const optionLabel = document.createElement('label');
                optionLabel.setAttribute('for', optionInput.id);
                optionLabel.innerText = option.text;

                optionInput.addEventListener('change', function() {
                    scores[index] = parseFloat(optionInput.value);
                });

                optionDiv.appendChild(optionInput);
                optionDiv.appendChild(optionLabel);
                questionsDiv.appendChild(optionDiv);
            });

            questionNumberDiv.innerText = `Question ${index + 1} of ${questions.length}`;
        }
    }

    prevButton.addEventListener("click", function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
            nextButton.classList.remove("hidden");
            submitButton.classList.add("hidden");
        }
    });

    nextButton.addEventListener("click", function() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }
        if (currentQuestionIndex === questions.length - 1) {
            nextButton.classList.add("hidden");
            submitButton.classList.remove("hidden");
        }
    });

    submitButton.addEventListener("click", function() {
        document.getElementById("questionContainer").classList.add("hidden");
        document.getElementById("questionNumber").classList.add("hidden");
        const totalScore = calculateTotalScore();
        document.getElementById("resultTable").classList.remove("hidden");
        displayResult(totalScore);
        document.getElementById("shareResultsButton").disabled = false;
    });
    function displayResult(score) {
        const results = [
            {
                level: 1,
                range: [0, 2],
                icon: "https://assets.filum.ai/assessments/voc-level1.svg",
                name: "Sơ khai",
                description: "Nguồn dữ liệu chính về phản hồi khách hàng đến từ các khảo sát theo năm hoặc không đều đặn. Các cuộc khảo sát được thực hiện độc lập bởi các phòng ban khác nhau mà không có sự chia sẻ kết quả và không lưu trữ tập trung. Hiếm khi thu thập phản hồi gián tiếp (từ bản ghi cuộc gọi, tin nhắn, bình luận v.v) hoặc phản hồi được suy luận từ hành vi, tần suất hay thói quen mua hàng của khách.",
                keyActions: [
                    "Hình thành một đội nhóm liên phòng ban để quản lý quy trình thu thập và phân tích phản hồi khách hàng.",
                    "Định kỳ tổ chức phỏng vấn khách hàng để thu thập thông tin chi tiết.",
                    "Xây dựng cơ sở dữ liệu tập trung lưu trữ phản hồi khách hàng.",
                    "Xác định và thực hiện phân tích nguyên nhân gốc từ phản hồi khách hàng.",
                    "Tạo ra cơ chế thông báo kết quả phản hồi cho các đại diện phòng ban liên quan."
                ],
                keyActionsCta: {
                    text: "Mô hình xử lý phản hồi cho mọi quy mô Doanh Nghiệp",
                    url: "https://filum.ai/products/dynamic-feedback"
                }
            },
            {
                level: 2,
                range: [2, 4],
                icon: "https://assets.filum.ai/assessments/voc-level2.svg",
                name: "Thành lập",
                description: "Có đội nhóm liên phòng ban để đánh giá và điều phối việc thu thập phản hồi, phân tích nguyên nhân gốc và thông báo kết quả đến các đại diện. Bước đầu quản trị năng lực Lắng nghe khách hàng để giải quyết vấn đề phân mảnh và thiếu phối hợp, tuy nhiên vấn đề thực thi còn yếu. Băt đầu có các cuộc khảo sát tại điểm chạm nhưng chưa phải tất cả các điểm chạm quan trọng.",
                keyActions: [
                    "Xây dựng một hệ thống thu thập phản hồi và lắng nghe khách hàng hiệu quả.",
                    "Đảm bảo tích hợp dữ liệu phản hồi trực tiếp và gián tiếp từ nhiều nguồn khác nhau.",
                    "Thực hiện quy trình đóng vòng phản hồi để xử lý các khiếu nại và vấn đề của khách hàng.",
                    "Mở rộng việc thực hiện khảo sát tại tất cả các điểm chạm quan trọng, xuyên suốt các giai đoạn của hành trình khách hàng.",
                    "Phát triển các tiêu chí và chỉ số để đo lường hiệu quả của việc Lắng nghe khách hàng."
                ],
                keyActionsCta: {
                    text: "Mô hình xử lý phản hồi cho mọi quy mô Doanh Nghiệp",
                    url: "https://filum.ai/products/dynamic-feedback"
                }
            },
            {
                level: 3,
                range: [4, 6],
                icon: "https://assets.filum.ai/assessments/voc-level3.svg",
                name: "Vận hành",
                description: "Quản trị năng lực Lắng nghe khách hàng đã hình thành và đem lại hiệu quả. Dữ liệu phản hồi trực tiếp từ khách hàng được kết hợp với dữ liệu từ các nguồn khác (Ví dụ: từ điểm chạm web, cửa hàng, v.v.) và phản hồi gián tiếp (Ví dụ: bản ghi cuộc gọi, tin nhắn, bình luận mạng xã hội v.v). Quy trình đóng vòng phản hồi giúp xác định và giải quyết các khiếu nại hoặc vấn đề khách hàng gặp phải. Phản hồi được thu thập trong nhiều giai đoạn của hành trình khách hàng.",
                keyActions: [
                    "Xây dựng năng lực Lắng nghe khách hàng tập trung trên một nền tảng, với quy trình và quy định rõ ràng về trách nhiệm và thực thi.",
                    "Ban hành các quy trình, biểu mẫu về Lắng nghe khách hàng rộng rãi cho toàn thể công ty.",
                    "Tạo ra các báo cáo và bảng điều khiển với dữ liệu phản hồi theo thời gian thực cho nhân viên và phòng ban.",
                    "Tích hợp phản hồi khách hàng vào các ứng dụng quan trọng như CRM, giúp ích vào hoạt động hằng ngày của nhân viên.",
                ],
                keyActionsCta: {
                    text: "Mô hình xử lý phản hồi cho mọi quy mô Doanh Nghiệp",
                    url: "https://filum.ai/products/dynamic-feedback"
                }
            },
            {
                level: 4,
                icon: "https://assets.filum.ai/assessments/voc-level4.svg",
                name: "Tối ưu",
                range: [
                    6,
                    8
                ],
                description: "Năng lực Lắng nghe khách hàng hoạt động đầy đủ trên một nền tảng duy nhất với quy định về trách nhiệm và thực thi rõ ràng. Các quy trình làm việc, báo cáo và phân tích được thông báo đầy đủ và tường minh, cung cấp dữ liệu thời gian thực, phù hợp cho từng nhân viên và phòng ban. Thông tin về phản hồi được tích hợp vào các ứng dụng quan trọng và phổ biến như CRM.",
                keyActions: [
                    "Ứng dụng công nghệ tự động dựa trên dữ liệu lớn và AI giúp phân tích và đưa ra hành động khuyến nghị từ phản hồi khách hàng.",
                    "Định lượng giá trị của Lắng nghe khách hàng thông qua kết nối các hành động khuyến nghị và kết quả thu được lên các chỉ số liên quan đến vận hành và khách hàng.",
                    "Xây dựng cơ chế cho việc thu thập ý kiến phản hồi từ nhân viên nhằm cải thiện trải nghiệm khách hàng.",
                    "Tổ chức đều đặn các hoạt động khuyến khích nhân viên tham gia đóng góp ý kiến để cải thiện trải nghiệm khách hàng.",
                ],
                keyActionsCta : {
                     text : "Mô hình xử lý phản hồi cho mọi quy mô Doanh Nghiệp",
                     url : "https://filum.ai/products/dynamic-feedback"
                }
            },
            {
                 level : 5,
                 icon : "https://assets.filum.ai/assessments/voc-level5.svg",
                name: "Thấm nhuần",
                range: [
                    8,
                    11
                ],
                description:
                    "Hiệu quả của Lắng nghe khách hàng được định lượng bằng việc kết nối các hành động đề xuất với kết quả thu được lên các chỉ số liên quan đến vận hành và khách hàng. Có cơ chế liên tục để thu thập ý kiến phản hồi từ nhân viên nhằm cải thiện trải nghiệm khách hàng.",
                keyActions: [
                    "Duy trì một hệ thống Lắng nghe khách hàng đồng nhất và liên tục.",
                    "Đầu tư vào công nghệ và công cụ hiện đại về dữ liệu lớn và AI để hỗ trợ việc ra quyết định hiệu quả hơn.",
                    "Tạo dựng văn hóa doanh nghiệp tập trung vào cải tiến liên tục trải nghiệm khách hàng.",
                    "Phát triển các chương trình đào tạo và huấn luyện nhằm nâng cao nhận thức về năng lực Lắng nghe khách hàng cho nhân viên.",
                    "Duy trì cơ chế liên tục thu thập ý kiến phản hồi từ nhân viên và khuyến khích sự đóng góp của họ vào việc cải thiện trải nghiệm khách hàng.",
                ],
                keyActionsCta: {
                    text: "Mô hình xử lý phản hồi cho mọi quy mô Doanh Nghiệp",
                    url: "https://filum.ai/products/dynamic-feedback"
                }
            }

        ];

        let result = results.find(result => score >= result.range[0] && score <= result.range[1]);

        if (result) {
            document.getElementById("resultIcon").src = result.icon;
            document.getElementById("resultName").innerText = result.name;
            document.getElementById("resultDescription").innerText = result.description;

            let keyActionsList = document.getElementById("keyActionsList");
            keyActionsList.innerHTML = '';
            result.keyActions.forEach(action => {
                let li = document.createElement('li');
                li.innerText = action;
                keyActionsList.appendChild(li);
            });

            let keyActionsCta = document.getElementById("keyActionsCta");
            keyActionsCta.innerText = result.keyActionsCta.text;
            keyActionsCta.href = result.keyActionsCta.url;

            document.getElementById("resultTable").classList.remove("hidden");
        }
    }
    function calculateTotalScore() {
        return scores.reduce((total, score) => total + (score !== null ? score : 0), 0);
    }

    questionContainer.classList.remove("hidden");
    introduction.classList.add("hidden");
});
let currentStep = 1;
const totalSteps = 5;
let intervalId;

function nextThumbnail() {

    document.getElementById(`step${currentStep}`).style.display = 'none';

    currentStep = currentStep % totalSteps + 1;
    document.getElementById(`step${currentStep}`).style.display = 'block';
}

function autoSwitch() {

    nextThumbnail();

    intervalId = setInterval(nextThumbnail, 2000);
}

autoSwitch();


function scrollToBottom() {

    const bottomElement = document.getElementById('actionButtons');

    bottomElement.scrollIntoView({ behavior: 'smooth' });
}

