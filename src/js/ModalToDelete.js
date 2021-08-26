export default class ModalToDelete {
  init() {
    const formConfirmDel = document.createElement('div');
    formConfirmDel.id = 'confirm-del';
    formConfirmDel.className = 'popup hidden';
    formConfirmDel.innerHTML = `
    <p>Удалить тикет?</p>
    <p>Вы уверены, что хотите удалить тикет? Вы не сможете отменить это действие.</p>
    <div class="buttons">
      <div id="cancel-del" class="button">Отмена</div>
      <div id="ok-del" class="button">ОК</div>
    </div>
    `;
    document.body.appendChild(formConfirmDel);
    this.formDel = document.getElementById('confirm-del');
    this.okDel = document.getElementById('ok-del');
    this.cancelDel = document.getElementById('cancel-del');
  }

  addListener(callback) {
    this.formDel.classList.add('hidden');
    callback();
    this.okDel.removeEventListener('click', this.boundedFunc);
  }

  makeVisible(callback) {
    this.formDel.classList.remove('hidden');
    this.formDel.style.top = `${(window.innerHeight
      - this.formDel.offsetHeight) / 2}px`;
    this.formDel.style.left = `${(window.innerWidth
      - this.formDel.offsetWidth) / 2}px`;
    this.boundedFunc = this.addListener.bind(this, callback);
    this.okDel.addEventListener('click', this.boundedFunc);

    this.cancelDel.addEventListener('click', () => {
      this.formDel.classList.add('hidden');
    });
  }
}
