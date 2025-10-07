const loadModule = async () => {
  const { $ } = await import(
    'https://releases.jquery.com/git/jquery-git.module.min.js'
  );
  $('*').css('color', 'red');
};

document.getElementById('load-btn').addEventListener('click', loadModule);
