//validate
function validate(option) {
    var formElement = document.querySelector(option.form);
    if (formElement) {
        option.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            var errorelemnt=formElement.parentElement.querySelector('small')
            var btnsave=formElement.querySelector('.btn-primary')
            btnsave.disabled=true;
            if (inputElement) {
                inputElement.onblur = function () {
                    var errorMessage = rule.test(inputElement.value);
                    if(errorMessage){
                        errorelemnt.innerText=errorMessage;
                        btnsave.disabled=true;
                    }
                    else
                    {
                        errorelemnt.innerText = '';
                        btnsave.disabled = false;
                    }
                }
                
            }
        });
    }
}


validate.isrequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Please enter your task';
        }
    };
};

validate(
    {
        form:'#form',
        rules:[
        validate.isrequired("#taskid")
       ]
    }
)

// thêm
function showdata()
{
    var tasklist;
    var taskvalue=document.querySelector('#taskid')
    
    if(localStorage.getItem("tasklist")==null){
        tasklist=[];
    }
    else {
        tasklist=JSON.parse(localStorage.getItem("tasklist"))
    }

    var table = "";
    tasklist.forEach(function (el, index) {
        table += `
            <tr>
                <td>${index ++}
                <td>${el.taskvalue}</td> 
                <td>${false}</td> 
                <td>
                    <button type="button" class="btn btn-danger" onclick="onDelete(${index})">Delete</button>
                    <button type="button" class="btn btn-success ms-1" onclick="onFinished(${index})">Finished</button>
                    <button type="button" class="btn btn-edit" onclick="onEdit(${index})">Edit</button>
                </td>
            </tr>`;
    });
    document.querySelector('.data-table tbody').innerHTML=table;
    
}
document.onload=showdata();
function addtask() {
    var inputvalue = document.querySelector('#taskid').value.trim();
    var disabledbtn = document.querySelector('.btn-primary');
    var tasklist;
    if (localStorage.getItem("tasklist") == null) {
        tasklist = [];
    } else {
        tasklist = JSON.parse(localStorage.getItem("tasklist"));
    }
    var exists = tasklist.some(function (item) {
        return item.taskvalue.toLowerCase()=== inputvalue.toLowerCase();
    });

    if (exists) {
        console.log('Đã tồn tại');
    } else {
        console.log('Chưa tồn tại');
        tasklist.push({
            taskvalue: inputvalue,
        });
    }
        localStorage.setItem("tasklist", JSON.stringify(tasklist));
        showdata();
    document.getElementById("taskid").value = "";
    disabledbtn.disabled = true;
}


// Xóa


