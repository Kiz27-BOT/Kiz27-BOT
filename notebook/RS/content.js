// Thay bằng link localtunnel Colab
const API_URL = "https://cool-gifts-punch.loca.lt/api/recommend";

// Biến toàn cục lưu trí nhớ của AI trong phiên làm việc
let sessionExcludedAppIds = [];

function detectSteamId() {
    const profileMatch = window.location.href.match(/\/profiles\/(\d{17})/);
    if (profileMatch && profileMatch.length > 1) return profileMatch[1];
    const idMatch = window.location.href.match(/\/id\/([^\/\?]+)/);
    if (idMatch && idMatch.length > 1) return idMatch[1];
    const htmlMatch = document.body.innerHTML.match(/7656119[0-9]{10}/);
    if (htmlMatch && htmlMatch.length > 0) return htmlMatch[0];
    return "";
}

// BỌC TOÀN BỘ LOGIC VÀO MỘT HÀM ĐỂ CÓ THỂ GỌI LẠI (HỒI SINH)
function initSteamAIWidget() {
    // KIỂM TRA: Nếu widget đã tồn tại thì không tạo thêm để tránh trùng lặp
    if (document.getElementById("steam-ai-container")) return;

    const style = document.createElement("style");
    style.id = "steam-ai-style"; // Đánh dấu ID cho style
    style.innerHTML = `
      #steam-ai-container {
        position: fixed; bottom: 20px; right: 20px; width: 340px;
        background: linear-gradient(135deg, #1b2838, #2a475e);
        color: #c7d5e0; border-radius: 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.6);
        z-index: 999999; font-family: Arial, sans-serif; overflow: hidden;
        transition: transform 0.3s ease;
      }
      #steam-ai-container.minimized { transform: translateY(calc(100% - 40px)); }
      #steam-ai-header {
        background-color: #171a21; padding: 10px 15px; display: flex;
        justify-content: space-between; align-items: center; cursor: pointer;
        border-bottom: 1px solid #66c0f4;
      }
      #steam-ai-header h3 { margin: 0; color: #66c0f4; font-size: 14px; text-transform: uppercase; }
      .toggle-btn { color: #8f98a0; font-weight: bold; }
      #steam-ai-body { padding: 15px; }
      
      .input-label { font-size: 11px; color: #8f98a0; margin-bottom: 3px; display: block; font-weight: bold;}
      .ai-input, .ai-query {
        width: 100%; box-sizing: border-box; padding: 10px; margin-bottom: 12px;
        border-radius: 4px; outline: none; transition: 0.2s;
      }
      .ai-input { background: rgba(0, 0, 0, 0.3); color: #fff; border: 1px solid #323f5c; }
      .ai-input:focus { border-color: #66c0f4; }
      
      .ai-query { background: rgba(25, 25, 25, 0.8); color: #a4d007; border: 1px dashed #66c0f4; }
      
      .ai-row { display: flex; gap: 8px; margin-bottom: 15px; align-items: center;}
      .btn-reset {
        flex: 1; padding: 10px 5px; background: #3d4450; color: #c7d5e0;
        border: none; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold;
      }
      .btn-reset:hover { background: #ff5252; color: #fff; }

      .ai-btn {
        width: 100%; padding: 10px; background: linear-gradient(to right, #47bfff 5%, #1a44c2 60%);
        background-size: 200% auto; color: #fff; border: none; border-radius: 4px;
        cursor: pointer; font-weight: bold; transition: 0.5s;
      }
      .ai-btn:hover { background-position: right center; box-shadow: 0 0 10px rgba(102, 192, 244, 0.6); }
      .ai-btn:disabled { background: #454545; color: #888; cursor: not-allowed; }
      
      #steam-ai-results { margin-top: 15px; max-height: 250px; overflow-y: auto; }
      #steam-ai-results::-webkit-scrollbar { width: 6px; }
      #steam-ai-results::-webkit-scrollbar-thumb { background: #66c0f4; border-radius: 3px; }
      
      .game-item {
        background: rgba(0, 0, 0, 0.2); margin-bottom: 8px; padding: 10px;
        border-radius: 6px; border-left: 3px solid #66c0f4;
      }
      .game-name { color: #fff; text-decoration: none; font-weight: bold; font-size: 13px; display: block; margin-bottom: 4px;}
      .game-name:hover { color: #66c0f4; }
      .game-score { color: #8f98a0; font-size: 11px; }
      .score-highlight { color: #a4d007; font-weight: bold; }
    `;
    
    // Tránh việc nhúng CSS nhiều lần
    if (!document.getElementById("steam-ai-style")) {
        document.head.appendChild(style);
    }

    const container = document.createElement("div");
    container.id = "steam-ai-container";

    const header = document.createElement("div");
    header.id = "steam-ai-header";
    header.innerHTML = `<h3><span>🤖</span> AI Recommender</h3><span class="toggle-btn">▼</span>`;

    const body = document.createElement("div");
    body.id = "steam-ai-body";

    const idLabel = document.createElement("span");
    idLabel.className = "input-label";
    idLabel.innerText = "Hồ sơ mục tiêu (Nhập ID khác nếu muốn):";

    const inputId = document.createElement("input");
    inputId.className = "ai-input";
    inputId.type = "text";
    inputId.placeholder = "Ví dụ: 76561198...";
    inputId.value = detectSteamId();

    const queryInput = document.createElement("input");
    queryInput.className = "ai-query";
    queryInput.type = "text";
    queryInput.placeholder = "VD: nông trại thư giãn, RPG đánh theo lượt...";

    const optionsRow = document.createElement("div");
    optionsRow.className = "ai-row";
    optionsRow.style.flexDirection = "column"; // Xếp dọc cho gọn
    optionsRow.style.alignItems = "stretch";
    optionsRow.innerHTML = `
        <div style="display: flex; gap: 8px; width: 100%;">
            <div style="flex: 2; display: flex; align-items: center; background: rgba(0,0,0,0.3); border: 1px solid #323f5c; border-radius: 4px; padding: 0 10px;">
                <span style="color: #8f98a0; font-size: 11px; margin-right: 5px; white-space: nowrap;">Số game:</span>
                <input type="number" id="ai-top-k" min="2" max="50" value="10" style="width: 100%; background: transparent; color: #fff; border: none; outline: none; padding: 10px 0;">
            </div>
            <button id="ai-clear-session" class="btn-reset">↺ XÓA TRÍ NHỚ</button>
        </div>
        <label style="color: #8f98a0; font-size: 12px; display: flex; align-items: center; gap: 5px; margin-top: 5px; cursor: pointer;">
            <input type="checkbox" id="ai-nsfw-filter" checked> 🛡️ Bật bộ lọc an toàn (Ẩn game 18+)
        </label>
    `;

    const button = document.createElement("button");
    button.className = "ai-btn";
    button.innerText = "Phân tích & Gợi ý";

    const resultDiv = document.createElement("div");
    resultDiv.id = "steam-ai-results";

    body.appendChild(idLabel);
    body.appendChild(inputId);
    body.appendChild(queryInput);
    body.appendChild(optionsRow);
    body.appendChild(button);
    body.appendChild(resultDiv);
    container.appendChild(header);
    container.appendChild(body);
    document.body.appendChild(container);

    // XỬ LÝ SỰ KIỆN
    header.addEventListener("click", () => {
        container.classList.toggle("minimized");
        header.querySelector(".toggle-btn").innerText = container.classList.contains("minimized") ? "▲" : "▼";
    });

    document.getElementById("ai-clear-session").addEventListener("click", () => {
        sessionExcludedAppIds = [];
        resultDiv.innerHTML = `<div style="color: #a4d007; text-align: center; padding: 10px;">Đã xóa trí nhớ. AI sẽ phân tích lại từ đầu!</div>`;
    });

    button.addEventListener("click", async () => {
        const targetUserId = inputId.value.trim();
        const textQuery = queryInput.value.trim();
        let topK = parseInt(document.getElementById("ai-top-k").value);
        
        if (isNaN(topK) || topK < 2) topK = 2;
        if (topK > 50) topK = 50;

        if (!targetUserId && !textQuery) {
            resultDiv.innerHTML = `<div style="color: #ff5252; text-align: center;">Vui lòng nhập SteamID hoặc Thể loại.</div>`;
            return;
        }

        button.innerText = "Đang phân tích...";
        button.disabled = true;
        resultDiv.innerHTML = `<div style="text-align: center; padding: 10px;">AI đang đọc tâm trí bạn... ⏳</div>`;

        try {
            // Lấy trạng thái của Checkbox (true hoặc false)
        // Lấy trạng thái của Checkbox (true hoặc false)
        const isNsfwFiltered = document.getElementById("ai-nsfw-filter").checked;
        const excludeString = sessionExcludedAppIds.join(",");
        
        // Truyền thêm biến &nsfw=... vào đường dẫn API
        const url = `${API_URL}?user_id=${targetUserId}&query=${encodeURIComponent(textQuery)}&top_k=${topK}&exclude=${excludeString}&nsfw=${isNsfwFiltered}`;
            
            const response = await fetch(url, {
                method: "GET",
                headers: { "Bypass-Tunnel-Reminder": "true", "Content-Type": "application/json" }
            });
            
            const data = await response.json();

            if(data.status === "success" && data.results.length > 0) {
                button.innerText = "Hoàn tất!";
                resultDiv.innerHTML = "";
                
                data.results.forEach(game => {
                    const matchId = game.steam_link.match(/\/app\/(\d+)/);
                    if (matchId && !sessionExcludedAppIds.includes(matchId[1])) {
                        sessionExcludedAppIds.push(matchId[1]);
                    }

                    const matchScore = (game.match_probability * 100).toFixed(1);
                    const gameDiv = document.createElement("div");
                    gameDiv.className = "game-item";
                    gameDiv.innerHTML = `
                        <a class="game-name" href="${game.steam_link}" target="_blank">${game.name}</a>
                        <div class="game-score">Độ phù hợp: <span class="score-highlight">${matchScore}%</span></div>
                    `;
                    resultDiv.appendChild(gameDiv);
                });
            } else {
                button.innerText = "Không tìm thấy";
                resultDiv.innerHTML = `<div style="color: #ff5252; text-align: center;">Kho game đã cạn hoặc bị lỗi.</div>`;
            }
        } catch (error) {
            button.innerText = "Lỗi Kết Nối";
            resultDiv.innerHTML = `<div style="color: #ff5252;">Mất kết nối với Server Colab.</div>`;
        } finally {
            setTimeout(() => { button.innerText = "Tiếp tục Đào sâu 🔍"; button.disabled = false; }, 2000);
        }
    });
}

// 1. Chạy ngay khi file được nạp
initSteamAIWidget();

// 2. Kỹ thuật BẤT TỬ (Heartbeat): Kiểm tra mỗi 1.5 giây
// Nếu Steam xóa mất Extension do render lại trang, ta lập tức gọi hàm hồi sinh nó.
setInterval(() => {
    if (!document.getElementById("steam-ai-container")) {
        console.log("Phát hiện Steam đã xóa AI Widget. Đang tiến hành hồi sinh...");
        initSteamAIWidget();
    }
}, 1500);