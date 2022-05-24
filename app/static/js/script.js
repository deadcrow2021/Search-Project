'use strict'

document.addEventListener("DOMContentLoaded", () => {

    function buildList(list){
        let wrapper = document.getElementById('list-wrapper');
        wrapper.innerHTML = '';
        
        for (let i=0; i < list.length; i++) {
            let item = document.createElement('div');
            item.classList.add('element')
            item.innerHTML = `
            <div class="element__row">
                <div class="element__subrow">
                    <div class="list__content">
                        <p>Курс: <span>${list[i]['course']}</span></p>
                    </div>
                    <div class="list__content">
                        <p>Кафедра: <span>${list[i]['department']}</span></p>
                    </div>
                    <div class="list__content">
                        <p>Дисциплина: <span>${list[i]['discipline']}</span></p>
                    </div>
                </div>

                <div class="element__subrow">
                    <div class="list__content">
                        <p>Тип литературы: <span>${list[i]['litrature_type']}</span></p>
                    </div>
                    <div class="list__content">
                        <p>Преподаватель: <span>${list[i]['teacher']}</span></p>
                    </div>
                </div>
            </div>

            <div class="element__row link">
                    <div class="list__content">
                        <p>Ссылка:</p>
                    </div>
                    <div class="list__content">
                        <p><span><a href="${list[i]['link']}">${list[i]['link']}</a></span></p>
                    </div>
            </div>`;
            wrapper.appendChild(item)
            
        }
    }

    let form = document.getElementById('form__wrapper')
    form.addEventListener('submit', function(e){
        e.preventDefault();
        console.log('Form submitted');
        let url = 'http://127.0.0.1:8000/list/';

        let literature_list = [];
        let course = document.getElementById('course').value;
        let department = document.getElementById('department').value;
        let discipline = document.getElementById('discipline').value;
        let literature_type = document.getElementById('literature_type').value;
        let teacher = document.getElementById('teacher').value;
        

        fetch(url)
        .then((resp) => resp.json())
        .then(function(data){
            let database = data 
            database.forEach(block => {
                try {
                    if (course && block['course'] != course) {
                        return;
                    }
        
                    if (department && block['department'] != department) {
                        return;
                    }
        
                    if (discipline && block['discipline'] != discipline) {
                        return;
                    }

                    block['liter'].forEach(liter_element => {
                        if (literature_type && liter_element['literature_type'] != literature_type) {
                            return;
                        } else {
                            for (let t = 0; t < liter_element['teacher'].length; t++) {
                                if (teacher && liter_element['teacher'][t]['teacher'] != teacher) {
                                    continue;
                                } else {
                                    literature_list.push({
                                        'course': block['course'],
                                        'department': block['department'],
                                        'discipline': block['discipline'],
                                        'litrature_type': liter_element['literature_type'],
                                        'teacher': liter_element['teacher'][t]['teacher'],
                                        'link': liter_element['literature']
                                    })
                                    break;
                                }
                            }
                        }
                    })
                } catch (err) {
                    console.log('ERR: No literature with such parameters')
                }
                
            })
            buildList(literature_list);
        });
    })
})