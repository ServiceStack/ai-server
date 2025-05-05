using ServiceStack;

namespace AiServer.ServiceModel.Types;

public class ComfyWorkflowStatus
{
    public string StatusMessage { get; set; }
    
    public string? Error { get; set; }
    public bool Completed { get; set; }
    public List<ComfyOutput> Outputs { get; set; } = new();
}

public class ComfyAgentDeleteModelResponse
{
    public string? Message { get; set; }
}

public class ComfyOutput
{
    public List<ComfyFileOutput> Files { get; set; } = new();
    public List<ComfyTextOutput> Texts { get; set; } = new();
}

public class ComfyFileOutput
{
    public string Filename { get; set; }
    public string Type { get; set; }
    public string Subfolder { get; set; }
}

public class ComfyTextOutput
{
    public string? Text { get; set; }
}

public class ComfyFileInput
{
    public string Name { get; set; }
    public string Type { get; set; }
    public string Subfolder { get; set; }
}

public enum ComfyMaskSource
{
    red,
    blue,
    green,
    alpha
}

public enum ComfySampler
{
    euler,
    euler_cfg_pp,
    euler_ancestral,
    euler_ancestral_cfg_pp,
    huen,
    huenpp2,
    dpm_2,
    dpm_2_ancestral,
    lms,
    dpm_fast,
    dpm_adaptive,
    dpmpp_2s_ancestral,
    dpmpp_2s_ancestral_cfg_pp,
    dpmpp_sde,
    dpmpp_sde_gpu,
    dpmpp_2m,
    dpmpp_2m_cfg_pp,
    dpmpp_2m_sde,
    dpmpp_2m_sde_gpu,
    dpmpp_3m_sde,
    dpmpp_3m_sde_gpu,
    ddpm,
    lcm,
    ipndm,
    ipndm_v,
    deis,
    res_multistep,
    res_multistep_cfg_pp,
    res_multistep_ancestral,
    res_multistep_ancestral_cfg_pp,
    gradient_estimation,
    er_sde,
    seeds_2,
    seeds_3,
    ddim,
    uni_pc,
    uni_pc_bh2,
}

public enum ComfyScheduler
{
    normal,
    karras,
    exponential,
    sgm_uniform,
    simple,
    ddim_uniform,
    beta,
    linear_quadratic,
    kl_optimal,
}



/*
{
"prompt_id": "f33f3b7a-a72a-4e06-8184-823a6fe5071f",
"number": 2,
"node_errors": {}
}
*/
public class ComfyWorkflowResponse
{
    public string PromptId { get; set; }
    public int Number { get; set; }
    public List<NodeError> NodeErrors { get; set; }
}

public class NodeError
{
    
}

public class TextPrompt
{
    public string Text { get; set; }
    public double Weight { get; set; }
}


public class ComfyModel
{
    public string Description { get; set; }
    public string Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
}