import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import Input from '../../components/Input';
import api from '../../services/api';
import './style.css';

import waningIcon from '../../assets/images/icons/warning.svg';

const TeacherForm: React.FC = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: '', from: '', to: '' } 
  ])

  const history = useHistory();

  function addNewScheduleItem () {
    setScheduleItems([
      ...scheduleItems,
      { week_day: '', from: '', to: '' }
    ])
  }

  function setScheduleItemValue (posistion: number, field: string, value: string) {
    const updatedScheduleItem = scheduleItems.map((scheduleItem, index) => {
      if (index === posistion) {
        return { ...scheduleItem, [field]: value };
      } else {
        return scheduleItem;
      }
    })

    setScheduleItems(updatedScheduleItem);
  }

  async function handleCreateClass (event: FormEvent) {
    event.preventDefault();

    api.post('/classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastrado com sucesso!')
      history.push('/');
    }).catch(() => {
      alert('Erro no servidor')
    })
  }

  return(
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title='Que incrível que você quer dar aulas.'
        description='O primeiro passo, é preencher esse formulário de inscrição' 
      />

      <main>
        <form onSubmit={handleCreateClass} >
          <fieldset>
            <legend>Seus dados</legend>
            <Input 
              name='name'
              label='Nome completo'
              value={name}
              onChange={(e) => setName(e.target.value) } 
            />

            <Input
              name='avatar'
              label='Avatar'
              value={avatar}
              onChange={(e) => setAvatar(e.target.value) }
            />

            <Input
              name='whatsapp'
              label='Whatsapp'
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value) }
            />

            <Textarea 
              name='bio'
              label='biografia'
              value={bio}
              onChange={(e) => setBio(e.target.value) }
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select 
              name='subject' 
              label='Matéria'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'Educação Física', label: 'Educação Física' },
                { value: 'Física', label: 'Física' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'História', label: 'História' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Português', label: 'Português' },
                { value: 'Química', label: 'Química' },
              ]}
            />
            <Input 
              name='cost'
              label='Custo da sua hora por aula'
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type='button' onClick={addNewScheduleItem}>+ Novo Horário</button>
            </legend>

            {
              scheduleItems.map((scheduleItem, index) => {
                return (
                  <div className="schedule-item" key={scheduleItem.week_day}>
                    <Select 
                      name='week_day' 
                      label='Dia da semana'
                      value={scheduleItem.week_day}
                      onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                      options={[
                        { value: '0', label: 'Domingo' },
                        { value: '1', label: 'Segunda-Feira' },
                        { value: '2', label: 'Terça-Feira' },
                        { value: '3', label: 'Quarta-Feira' },
                        { value: '4', label: 'Quinta-Feira' },
                        { value: '5', label: 'Sexta-Feira' },
                        { value: '6', label: 'Sábado' }
                      ]}
                    />
                    <Input
                      name='from'
                      label='Das'
                      type='time'
                      value={scheduleItem.from}
                      onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                    />
                    <Input
                      name='to'
                      label='Ate'
                      type='time'
                      value={scheduleItem.to}
                      onChange={e => setScheduleItemValue(index, 'to', e.target.value)} 
                    />
                  </div>
                );
              })
            }
          </fieldset>

          <footer>
            <p>
              <img src={waningIcon} alt="Aviso importante"/>
              importante ! <br/>
              Preencha todos os dados
            </p>
            
            <button type='submit'>
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm;