export interface UseCase<IRequestDTO, IResponseDTO> {
  execute(dto?: IRequestDTO): Promise<IResponseDTO> | IResponseDTO;
}
