const chatBox = document.getElementById("chat-box");
const input = document.getElementById("message");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", function(event){

    if(event.key==="Enter"){
        sendMessage();
    }

});

async function sendMessage(){

    const message = input.value.trim();

    if(message==="") return;

    // User message

    chatBox.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;

    input.value="";

    chatBox.scrollTop = chatBox.scrollHeight;

    try{

        const response = await fetch("/get",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                message:message
            })

        });

        const data = await response.json();

        chatBox.innerHTML += `
            <div class="bot-message">
                ${data.answer}
            </div>
        `;

    }

    catch(error){

        chatBox.innerHTML += `
            <div class="bot-message">
                Something went wrong. Please try again.
            </div>
        `;

    }

    chatBox.scrollTop = chatBox.scrollHeight;

}