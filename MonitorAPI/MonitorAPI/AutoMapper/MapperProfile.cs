using AutoMapper;
using Core.DTO;
using MonitorAPI.Models;

namespace MonitorAPI.AutoMapper
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<AddUserRequestModel, AddUserRequestDTO>().ReverseMap();
            CreateMap<GetUserDetailsModel, GetUserDetailsDTO>().ReverseMap();
            CreateMap<LoginRequestModel, LoginRequestDTO>().ReverseMap();
            CreateMap<LoginResponseModel, LoginResponseDTO>().ReverseMap();
            CreateMap<MenuResponseModel, MenuResponseDTO>().ReverseMap();
            CreateMap<WinServiceRequestModel, WinServiceRequestDTO>().ReverseMap();
            CreateMap<WinServiceResponseDetailsModel, WinServiceResponseDetailsDTO>().ReverseMap();
            CreateMap<PreApprovalRequestModel, PreApprovalRequestDTO>().ReverseMap();
            CreateMap<PreApprovalDetailsModel, PreApprovalDetailsDTO>().ReverseMap();
            CreateMap<ApprovalDiagnosisDetailsModel, ApprovalDiagnosisDetailsDTO>().ReverseMap();
            CreateMap<ApprovalServiceDetailsModel, ApprovalServiceDetailsDTO>().ReverseMap();
            CreateMap<PBMDataCountModel, PBMDataCountDTO>().ReverseMap();
            CreateMap<PreApprovalRequestModel, PreApprovalRequestDTO>().ReverseMap();
            CreateMap<PBMDenialCodeDataCountModel, PBMDenialCodeDataCountDTO>().ReverseMap();
            CreateMap<MasterSyncRequestDetailsDTO, MasterSyncRequestDetailsModel>()
            .ForMember(dest => dest.StartDate,
                opt => opt.MapFrom(src => src.StartDate.ToString("yyyy/MM/dd")))
            .ForMember(dest => dest.EndDate,
                opt => opt.MapFrom(src => src.EndDate.ToString("yyyy/MM/dd")))
            .ReverseMap()
            .ForMember(dest => dest.StartDate,
                opt => opt.MapFrom(src => DateTime.Parse(src.StartDate)))
            .ForMember(dest => dest.EndDate,
                opt => opt.MapFrom(src => DateTime.Parse(src.EndDate)));
            CreateMap<PBMDumpRequestDTO, PBMDumpRequestModel>()
            .ForMember(dest => dest.StartDate,
                opt => opt.MapFrom(src => src.StartDate.ToString("yyyy/MM/dd")))
            .ForMember(dest => dest.EndDate,
                opt => opt.MapFrom(src => src.EndDate.ToString("yyyy/MM/dd")))
            .ReverseMap()
            .ForMember(dest => dest.StartDate,
                opt => opt.MapFrom(src => DateTime.Parse(src.StartDate)))
            .ForMember(dest => dest.EndDate,
                opt => opt.MapFrom(src => DateTime.Parse(src.EndDate)));
        }
    }
}
