interface IService<T> {
  create(obj:T):Promise<T>,
}

export default IService;