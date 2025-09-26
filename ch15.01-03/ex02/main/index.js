const loadModule = async () => {
  const mod = await import('http://localhost:4000/module.js');
  console.log(mod.add(1, 2)); // 3
};

document.getElementById('load-btn').addEventListener('click', loadModule);
